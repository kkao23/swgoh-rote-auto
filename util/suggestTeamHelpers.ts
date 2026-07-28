import type { DataType } from '~/models/data';
import type { leads } from '~/data/leads';

type LeadDef = (typeof leads)[number];

// ── Lead → gameId lookup ────────────────────────────────────────

export function buildLeadToGameId(leadDefs: LeadDef[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const l of leadDefs) {
    map.set(l.fullName.toLowerCase(), l.id);
    map.set(l.id.toLowerCase(), l.id);
    for (const alias of l.aliases) {
      map.set(alias.toLowerCase(), l.id);
    }
  }
  return map;
}

export function matchGameId(lookup: Map<string, string>, leadText: string): string | undefined {
  return lookup.get(leadText.trim().toLowerCase());
}

// ── Duplicate lead checker ───────────────────────────────────────

const PHASE_KEY: Record<string, string> = {
  P1: 'phase1', P2: 'phase2', P3: 'phase3',
  P4: 'phase4', P5: 'phase5', P6: 'phase6',
};
const ALIGNMENT_KEY: Record<string, string> = {
  LS: 'ls', DS: 'ds', Mixed: 'mixed',
};

export function fuzzyMatchPosition(userInput: string, dataKey: string): boolean {
  const a = userInput.toLowerCase().replace(/[^a-z0-9]/g, '');
  const b = dataKey.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!a || !b) return false;
  return a === b || a.includes(b) || b.includes(a);
}

export function checkDuplicateLead(
  rawData: DataType,
  phase: string,
  alignment: string,
  position: string,
  lead: string,
): boolean {
  const pk = PHASE_KEY[phase] ?? phase.toLowerCase();
  const ak = ALIGNMENT_KEY[alignment] ?? alignment.toLowerCase();
  const leadLower = lead.trim().toLowerCase();

  // Try direct phase key first (e.g., phase1, phase3)
  const phaseData = rawData[pk];
  if (phaseData) {
    const sideData = phaseData[ak];
    if (sideData) {
      return sideHasLead(sideData, position, leadLower);
    }
    // Check sub-sides within this phase (e.g., phase3.zeffo)
    const subKey = phase.toLowerCase();
    const subSide = phaseData[subKey];
    if (subSide) {
      return sideHasLead(subSide, position, leadLower);
    }
    return false;
  }

  // Phase not found directly — scan all phases for a matching sub-key
  // (Zeffo lives under phase3.zeffo, Mandalore under phase4.mandalore)
  const subKey = phase.toLowerCase();
  for (const phaseValue of Object.values(rawData)) {
    const subSide = (phaseValue as Record<string, unknown>)[subKey];
    if (subSide) {
      return sideHasLead(subSide as Record<string, unknown[]>, position, leadLower);
    }
  }

  return false;
}

function sideHasLead(
  side: Record<string, unknown[]>,
  position: string,
  leadLower: string,
): boolean {
  for (const [posKey, teams] of Object.entries(side)) {
    if (fuzzyMatchPosition(position, posKey)) {
      return (teams as Array<{ lead: string }>).some(
        t => t.lead.toLowerCase() === leadLower,
      );
    }
  }
  return false;
}
