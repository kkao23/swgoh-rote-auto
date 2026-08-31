import { leads } from '~/data/leads';
import { getUnitName } from '~/data/units';

export interface HotUtilsLeadOption {
  key: string;
  label: string;
}

export interface HotUtilsMatchResult {
  matched: { key: string; label: string }[];
  unmatched: string[];
}

const STATUS_EMOJI = /^([✅🚫✔️❌❎☑️⬜🔲🟩🟥⛔🟨🟦🟪])\s*/u;

/**
 * Extracts unit names from a HotUtils platoon paste.
 * Zone headers, platoon labels, and trailing summary lines are ignored;
 * only lines beginning with a status emoji are treated as units.
 */
export function parseHotUtilsPlatoons(text: string): string[] {
  const names: string[] = [];
  const seen = new Set<string>();

  for (const rawLine of text.split(/\r?\n/)) {
    let line = rawLine.trim();
    line = line.replace(/^\*+/, '').trim();          // bold open (e.g. **✅ Unit)
    line = line.replace(/^[•●▪▸\-–]\s*/, '').trim(); // bullet markers
    if (!line) continue;

    const status = line.match(STATUS_EMOJI);
    if (!status) continue;

    line = line.slice(status[0].length).replace(/\*+$/, '').trim();
    if (!line) continue;

    const dedupe = line.toLowerCase();
    if (!seen.has(dedupe)) {
      seen.add(dedupe);
      names.push(line);
    }
  }

  return names;
}

/** Lowercase and strip everything that isn't alphanumeric. */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[\u2018\u2019\u02bc]/g, "'")
    .replace(/[^a-z0-9]/g, '');
}

function stripParenthetical(name: string): string {
  return name.replace(/\(.*?\)/g, '').trim();
}

/**
 * Matches HotUtils unit names against the exclusion UI's lead options.
 * Matching is deliberately forgiving: it compares normalized forms
 * (lowercase, punctuation/spacing removed) so names like "Anakin's Eta-2
 * Starfighter" and "Anakinseta2starfighter" still line up.
 */
export function matchHotUtilsUnitNames(
  names: string[],
  leadOptions: HotUtilsLeadOption[],
): HotUtilsMatchResult {
  const labelByKey = new Map(leadOptions.map(opt => [opt.key, opt.label]));
  const index = new Map<string, HotUtilsLeadOption>();

  const add = (rawName: string, key: string) => {
    const normalized = normalizeName(rawName);
    if (!normalized) return;
    if (!index.has(normalized)) {
      index.set(normalized, { key, label: labelByKey.get(key) ?? rawName });
    }
  };

  // Option labels + canonical unit names from data/units.ts
  for (const opt of leadOptions) {
    add(opt.label, opt.key);
    add(opt.key, opt.key);
    const unitName = getUnitName(opt.key);
    if (unitName) add(unitName, opt.key);
  }

  // leads.ts full names + aliases when that lead id exists in the UI
  for (const lead of leads) {
    const key = lead.id.toLowerCase();
    if (!labelByKey.has(key)) continue;
    add(lead.id, key);
    add(lead.fullName, key);
    for (const alias of lead.aliases) add(alias, key);
  }

  const matched: { key: string; label: string }[] = [];
  const seenKeys = new Set<string>();
  const unmatched: string[] = [];

  for (const name of names) {
    let hit = index.get(normalizeName(name));

    if (!hit) {
      const stripped = stripParenthetical(name);
      if (stripped !== name) hit = index.get(normalizeName(stripped));
    }

    // Last-resort: unique contains match (e.g. "Boushh (Leia Organa)").
    if (!hit) {
      const target = normalizeName(stripParenthetical(name));
      const candidates = leadOptions.filter((opt) => {
        const labelNorm = normalizeName(opt.label);
        if (labelNorm.length < 5) return false;
        return labelNorm.includes(target) || target.includes(labelNorm);
      });
      if (candidates.length === 1) hit = candidates[0];
    }

    if (hit) {
      if (!seenKeys.has(hit.key)) {
        seenKeys.add(hit.key);
        matched.push(hit);
      }
    } else {
      unmatched.push(name);
    }
  }

  return { matched, unmatched };
}
