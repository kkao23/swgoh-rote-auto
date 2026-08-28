import type { data as TeamData } from '~/models/data';
import { teamScore, type FlatPlanet, type FlatMission } from '~/util/plannerHelpers';
import { interactionBadges } from '~/util/missionHelpers';

// ── Minimal row contract (subset of PlannerResults' UnifiedRow) ──

export interface ExportRow {
  missionId: string;
  missionLabel: string;
  phase: string;
  alignment: string;
  kind: 'assigned' | 'unavailable' | 'unassigned';
  solverLead: string | null;
  solverOthers: string | null;
}

// ── Helpers duplicated here to keep the util self-contained ──

function successLabel(rate: string | undefined): string {
  switch (rate) {
    case 'consistent': return '100%';
    case 'ninety-percent': return '90%';
    case 'usually': return '70%';
    case 'fifty-fifty': return '50%';
    case 'unreliable': return 'Unreliable';
    default: return '—';
  }
}

// ── Reddit markdown table builder ───────────────────────────────

interface ExportRowData {
  mission: string;
  planet: string;
  team: string;
  success: string;
  int: string;
  score: string;
}

function buildExportRowData(
  row: ExportRow,
  getEffectiveTeam: (row: ExportRow) => TeamData | null,
): ExportRowData {
  const mission = row.missionLabel;
  const planet = `${row.phase} ${row.alignment}`;

  let team: string;
  if (row.kind === 'unavailable') {
    team = 'N/A (No eligible team)';
  } else {
    const effective = getEffectiveTeam(row);
    if (effective) {
      const lead = effective.leadFull || effective.lead;
      team = effective.others ? `${lead} (${effective.others})` : lead;
    } else if (row.kind === 'unassigned') {
      team = 'Unassigned';
    } else {
      team = row.solverLead || '—';
    }
  }

  const effective = getEffectiveTeam(row);
  const success = effective ? successLabel(effective.successRate) : '—';

  let int: string;
  if (effective?.interactionType && effective.interactionType.length > 0) {
    const badges = interactionBadges(effective.interactionType);
    int = badges.length > 0
      ? badges.map(b => b.tooltip).join(', ')
      : 'Auto';
  } else {
    int = effective ? 'Auto' : '—';
  }

  const score = effective ? String(teamScore(effective)) : '—';

  return { mission, planet, team, success, int, score };
}

export function buildRedditTable(
  rows: ExportRow[],
  getEffectiveTeam: (row: ExportRow) => TeamData | null,
): string {
  const lines: string[] = [];
  const header = '| Mission | Planet | Team | Success | Int | Score |';
  const separator = '|---------|--------|------|---------|-----|-------|';
  lines.push(header, separator);

  for (const row of rows) {
    const d = buildExportRowData(row, getEffectiveTeam);
    lines.push(`| ${d.mission} | ${d.planet} | ${d.team} | ${d.success} | ${d.int} | ${d.score} |`);
  }

  return lines.join('\n');
}

// ── Spreadsheet (TSV) builder for clipboard paste ────────────────

/**
 * Builds tab-separated values that paste directly into Excel,
 * Google Sheets, LibreOffice, etc. as rows/columns.
 */
export function buildSpreadsheetText(
  rows: ExportRow[],
  getEffectiveTeam: (row: ExportRow) => TeamData | null,
): string {
  const headers = ['Mission', 'Planet', 'Team', 'Success', 'Int', 'Score'];
  const lines: string[] = [headers.join('\t')];

  for (const row of rows) {
    const d = buildExportRowData(row, getEffectiveTeam);
    lines.push(
      [d.mission, d.planet, d.team, d.success, d.int, d.score]
        .map(cell => String(cell).replace(/\t/g, ' ').replace(/\r?\n/g, ' '))
        .join('\t'),
    );
  }

  return lines.join('\n');
}

// ── Clipboard helpers ───────────────────────────────────────────

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

// ── Day plan (mission selection) share/import ─────────────────────

export interface DayPlanParseDay {
  dayIndex: number | null;
  dayLabel: string | null;
  selectedMissionIds: string[];
}

export interface DayPlanParseResult {
  days: DayPlanParseDay[];
  errors: string[];
}

// ── Standardized day plan file format (JSON) ─────────────────────

export const DAY_PLAN_FORMAT = 'swgoh-rote-day-plan';
export const DAY_PLAN_VERSION = 2;

export interface DayPlanFileMission {
  id: string;
  label: string;
  planet: string;
  phase: string;
}

export interface DayPlanFileDay {
  dayLabel: string;
  dayIndex: number | null;
  selectedMissions: DayPlanFileMission[];
}

export interface DayPlanFile {
  format: typeof DAY_PLAN_FORMAT;
  version: number;
  days: DayPlanFileDay[];
}

export interface DayPlanFileDayInput {
  dayLabel: string;
  dayIndex?: number | null;
  selectedMissionIds: string[] | Set<string>;
}

/**
 * Builds a human-readable, re-importable plan for a single day.
 * Only planets with at least one selected mission are included.
 * Missions explicitly left unselected on an otherwise-active planet
 * are listed as "blocked".
 */
export function buildDayPlanText(
  dayLabel: string,
  planets: FlatPlanet[],
  selectedMissionIds: Set<string>,
): string {
  const lines: string[] = [`ROTE ${dayLabel} Plan`];

  for (const planet of planets) {
    const selected = planet.missions.filter(m => selectedMissionIds.has(m.id));
    if (selected.length === 0) continue;

    lines.push(`[${planet.phase}] ${planet.planet}`);

    if (selected.length === planet.missions.length) {
      lines.push(`  + All missions (${planet.missions.length})`);
    } else {
      for (const mission of planet.missions) {
        if (selectedMissionIds.has(mission.id)) {
          lines.push(`  + ${mission.label}`);
        } else {
          lines.push(`  - ${mission.label} (blocked)`);
        }
      }
    }
  }

  if (lines.length === 1) lines.push('(no missions selected)');
  return lines.join('\n');
}

/**
 * Parses a plan produced by buildDayPlanText back into mission ids.
 * Blocked lines ("- ...") are ignored because blocked missions are
 * simply not selected.
 */
export function parseDayPlanText(text: string, planets: FlatPlanet[]): DayPlanParseResult {
  const selected = new Set<string>();
  const errors: string[] = [];
  let dayIndex: number | null = null;
  let dayLabel: string | null = null;

  const planetByName = new Map(planets.map(p => [p.planet.trim().toLowerCase(), p]));

  let currentPlanet: FlatPlanet | null = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    // Day header, e.g. "ROTE Day 4 Plan" or a bare "Day 4"
    const dayMatch = line.match(/^ROTE\s+(Day\s+\d+)\s+Plan/i) ?? line.match(/^(Day\s+\d+)\b/i);
    if (dayMatch) {
      dayLabel = dayMatch[1].replace(/\s+/g, ' ');
      const n = parseInt(dayLabel.match(/\d+/)?.[0] ?? '', 10);
      if (!Number.isNaN(n) && n >= 1 && n <= 6) dayIndex = n - 1;
      continue;
    }

    // Planet line, e.g. "[P4] Mandalore"
    const planetMatch = line.match(/^\[([^\]]+)\]\s*(.+)$/);
    if (planetMatch) {
      const name = planetMatch[2].trim();
      currentPlanet = planetByName.get(name.toLowerCase()) ?? null;
      if (!currentPlanet) errors.push(`Unknown planet: ${name}`);
      continue;
    }

    // Mission line, e.g. "+ Ship" or "- Ship (blocked)"
    if (currentPlanet && (line.startsWith('+') || line.startsWith('-'))) {
      const isBlocked = line.startsWith('-');
      const rest = line.slice(1).replace(/\(blocked\)/i, '').trim();

      if (isBlocked) continue;

      if (/^all missions\b/i.test(rest)) {
        for (const m of currentPlanet.missions) selected.add(m.id);
        continue;
      }

      const mission = currentPlanet.missions.find(
        m => m.label.trim().toLowerCase() === rest.toLowerCase(),
      );
      if (mission) {
        selected.add(mission.id);
      } else {
        errors.push(`Unknown mission on ${currentPlanet.planet}: ${rest}`);
      }
    }
  }

  return {
    days: [
      {
        dayIndex,
        dayLabel,
        selectedMissionIds: [...selected],
      },
    ],
    errors,
  };
}

// ── Standardized JSON day plan build/parse ───────────────────────

function dayIndexFromLabel(dayLabel: string): number | null {
  const n = parseInt(dayLabel.match(/\d+/)?.[0] ?? '', 10);
  return Number.isNaN(n) || n < 1 || n > 6 ? null : n - 1;
}

/**
 * Builds a standardized, versioned JSON representation of one or more day
 * plans. Days with no selected missions are skipped. Re-importable via
 * parseDayPlanFile.
 */
export function buildDayPlanFile(
  dayPlans: DayPlanFileDayInput[],
  planets: FlatPlanet[],
): string {
  const days: DayPlanFileDay[] = [];

  for (const plan of dayPlans) {
    const selectedSet = new Set(plan.selectedMissionIds);
    if (selectedSet.size === 0) continue;

    const selectedMissions: DayPlanFileMission[] = [];
    for (const planet of planets) {
      for (const mission of planet.missions) {
        if (!selectedSet.has(mission.id)) continue;
        selectedMissions.push({
          id: mission.id,
          label: mission.label,
          planet: planet.planet,
          phase: planet.phase,
        });
      }
    }

    if (selectedMissions.length === 0) continue;

    days.push({
      dayLabel: plan.dayLabel,
      dayIndex: plan.dayIndex !== undefined ? plan.dayIndex : dayIndexFromLabel(plan.dayLabel),
      selectedMissions,
    });
  }

  const file: DayPlanFile = {
    format: DAY_PLAN_FORMAT,
    version: DAY_PLAN_VERSION,
    days,
  };

  return JSON.stringify(file, null, 2);
}

/**
 * Parses either a standardized JSON day plan (produced by buildDayPlanFile)
 * or a legacy human-readable plan (produced by buildDayPlanText) back into
 * mission ids per day.
 */
export function parseDayPlanFile(text: string, planets: FlatPlanet[]): DayPlanParseResult {
  const trimmed = text.replace(/^\uFEFF/, '').trim();
  if (!trimmed) {
    return { days: [], errors: [] };
  }

  if (trimmed.startsWith('{')) {
    return parseDayPlanJson(trimmed, planets);
  }

  // Backwards compatibility with the old human-readable clipboard format.
  return parseDayPlanText(trimmed, planets);
}

function parseDayPlanJson(text: string, planets: FlatPlanet[]): DayPlanParseResult {
  const errors: string[] = [];

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return {
      days: [],
      errors: ['Clipboard text is not valid JSON.'],
    };
  }

  const plan = data as Partial<DayPlanFile> | null;
  if (!plan || typeof plan !== 'object' || plan.format !== DAY_PLAN_FORMAT) {
    return {
      days: [],
      errors: [`Unrecognized plan format. Expected "${DAY_PLAN_FORMAT}".`],
    };
  }

  const missionById = new Map<string, FlatMission>();
  for (const planet of planets) {
    for (const mission of planet.missions) {
      missionById.set(mission.id, mission);
    }
  }

  // v1 was a single-day object: { dayLabel, dayIndex, selectedMissions }.
  if (plan.version === 1) {
    const day = parseDayPlanJsonDay(plan, missionById, errors);
    return { days: day ? [day] : [], errors };
  }

  if (plan.version !== DAY_PLAN_VERSION) {
    return {
      days: [],
      errors: [`Unsupported plan version: ${String(plan.version)}. Expected version ${DAY_PLAN_VERSION}.`],
    };
  }

  if (!Array.isArray(plan.days)) {
    return {
      days: [],
      errors: ['Plan has no "days" array.'],
    };
  }

  const days: DayPlanParseDay[] = [];
  for (const entry of plan.days) {
    const day = parseDayPlanJsonDay(entry, missionById, errors);
    if (day) days.push(day);
  }

  return { days, errors };
}

function parseDayPlanJsonDay(
  entry: unknown,
  missionById: Map<string, FlatMission>,
  errors: string[],
): DayPlanParseDay | null {
  if (!entry || typeof entry !== 'object') {
    errors.push('Skipped a day entry that is not an object.');
    return null;
  }

  const day = entry as Partial<DayPlanFileDay>;
  const dayLabel = typeof day.dayLabel === 'string' ? day.dayLabel.trim() || null : null;
  const rawDayIndex = day.dayIndex;
  const dayIndex = Number.isInteger(rawDayIndex)
    && (rawDayIndex as number) >= 0
    && (rawDayIndex as number) <= 5
    ? (rawDayIndex as number)
    : dayLabel
      ? dayIndexFromLabel(dayLabel)
      : null;

  const selected = new Set<string>();
  const missions = Array.isArray(day.selectedMissions) ? day.selectedMissions : [];

  if (!Array.isArray(day.selectedMissions)) {
    errors.push(`Day "${dayLabel ?? 'unknown'}" has no "selectedMissions" array.`);
  }

  for (const missionEntry of missions) {
    const id = missionEntry && typeof missionEntry === 'object' && typeof (missionEntry as DayPlanFileMission).id === 'string'
      ? (missionEntry as DayPlanFileMission).id
      : '';
    if (!id) {
      errors.push('Skipped a mission entry with no id.');
      continue;
    }
    if (missionById.has(id)) {
      selected.add(id);
    } else {
      errors.push(`Unknown mission id: ${id}`);
    }
  }

  return { dayIndex, dayLabel, selectedMissionIds: [...selected] };
}

// ── Clipboard read helper ─────────────────────────────────────────

export async function readFromClipboard(): Promise<string> {
  try {
    return await navigator.clipboard.readText();
  } catch {
    // Fallback for browsers that block clipboard reads
    return window.prompt('Paste the day plan (JSON or legacy text) below:') ?? '';
  }
}
