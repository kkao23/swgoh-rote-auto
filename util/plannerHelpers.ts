import { data as allData } from '~/data/data';
import type { data as TeamData, DataType } from '~/models/data';
import { successRate } from '~/models/data';
import { leads } from '~/data/leads';
import { GAME_ID_DISPLAY_NAMES, formatGameIdForDisplay } from '~/data/displayNames';
import { hungarian } from '~/util/solver';

// ── Types ────────────────────────────────────────────────────────────

export interface FlatMission {
  id: string;
  phase: string;
  alignment: string;
  position: string;
  label: string;
  planet: string;
  teams: TeamData[];
}

export interface FlatPlanet {
  id: string;
  phase: string;
  alignment: string;
  planet: string;
  missions: FlatMission[];
}

export interface PlanetAvailability {
  availableMissions: FlatMission[];
  unavailableMissions: FlatMission[];
  totalCount: number;
  hasIssues: boolean;
}

export interface PlannerAssignment {
  missionId: string;
  missionLabel: string;
  phase: string;
  alignment: string;
  position: string;
  lead: string;
  leadFull: string | undefined;
  others: string;
  successRate: string | undefined;
  score: number;
  icon: string | undefined;
}

export interface SolveResult {
  assignments: PlannerAssignment[];
  totalScore: number;
  maxPossibleScore: number;
  unassigned: FlatMission[];
  unavailableMissions: FlatMission[];
  infeasible: boolean;
}

export interface LeadInfo {
  /** Canonical dedup key — e.g. "doctoraphra" */
  key: string;
  /** Best display label — e.g. "Doctor Aphra" */
  display: string;
  icon: string | undefined;
}

// ── Display helpers ────────────────────────────────────────────────

const PLANET_MAP: Record<string, Record<string, string>> = {
  phase1: { ds: 'Mustafar', ls: 'Coruscant', mixed: 'Corellia' },
  phase2: { ds: 'Geonosis', ls: 'Bracca', mixed: 'Felucia' },
  phase3: { ds: 'Dathomir', ls: 'Kashyyyk', mixed: 'Tatooine', zeffo: 'Zeffo' },
  phase4: { ds: 'Haven', ls: 'Lothal', mixed: 'Kessel', mandalore: 'Mandalore' },
  phase5: { ds: 'Malachor', ls: 'Kafrene', mixed: 'Vandor' },
  phase6: { ds: 'Death Star', ls: 'Scarif', mixed: 'Hoth' },
  special: { all: 'Special' },
};

const PHASE_PREFIX: Record<string, string> = {
  phase1: 'P1', phase2: 'P2', phase3: 'P3',
  phase4: 'P4', phase5: 'P5', phase6: 'P6',
  special: 'Special',
};

const ALIGNMENT_LABEL: Record<string, string> = {
  ds: 'Dark Side', ls: 'Light Side', mixed: 'Mixed',
  zeffo: 'Zeffo', mandalore: 'Mandalore', all: 'Special',
};

export const PHASE_ORDER = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Zeffo', 'Mandalore', 'Special'];

// ── Canonical lead key ─────────────────────────────────────────────

// Build a lookup from lowercase name → leads entry, using id + fullName + aliases
const leadByName = new Map<string, (typeof leads)[number]>();
for (const l of leads) {
  leadByName.set(l.id.toLowerCase(), l);
  leadByName.set(l.fullName.toLowerCase(), l);
  for (const alias of l.aliases) {
    leadByName.set(alias.toLowerCase(), l);
  }
}

/**
 * Returns a stable, canonical key for dedup purposes.
 * Prefers gameId → resolves through leads.ts → falls back to stripped lead text.
 */
export function canonicalLeadKey(team: TeamData): string {
  // 1. gameId — grab the first ID (the lead character)
  if (team.gameId) {
    const firstId = team.gameId.split(',')[0].trim().toLowerCase();
    if (firstId) return firstId;
  }

  // 2. Strip parentheticals and trim
  const stripped = team.lead.replace(/\(.*?\)/g, '').trim().toLowerCase();

  // 3. Match against leads.ts
  const match = leadByName.get(stripped);
  if (match) return match.id;

  // 4. Last resort: the stripped text
  return stripped;
}

/**
 * Best display name for a canonical lead key.
 * Tries: leads.ts → strip "capital" prefix & try again → known overrides → smart format.
 */
export function canonicalLeadDisplay(key: string): string {
  // 1. Exact match in leads.ts
  const match = leadByName.get(key);
  if (match) return match.fullName;

  // 2. Strip "capital" prefix (for ship capitals) and try again
  if (key.startsWith('capital')) {
    const stripped = key.slice('capital'.length);
    const strippedMatch = leadByName.get(stripped);
    if (strippedMatch) return strippedMatch.fullName;
  }

  // 3. Known display overrides for gameIds not in leads.ts
  if (GAME_ID_DISPLAY_NAMES[key]) return GAME_ID_DISPLAY_NAMES[key];

  // 4. Smart formatting: split camelCase/ALL_CAPS into Title Case
  return formatGameIdForDisplay(key);
}

// ── Score mapping ────────────────────────────────────────────────────

export function teamScore(team: TeamData): number {
  switch (team.successRate) {
    case successRate.CONSISTENT: return 100;
    case successRate.NINETY_PERCENT: return 90;
    case successRate.USUALLY: return 70;
    case successRate.FIFTY_FIFTY: return 50;
    case successRate.UNRELIABLE: return 10;
    default: return 50;
  }
}

export function teamCost(team: TeamData): number {
  return 100 - teamScore(team);
}

export const INVALID_COST = 100_000;

// ── Data flattening ──────────────────────────────────────────────────

export function getFlatMissions(): FlatMission[] {
  const missions: FlatMission[] = [];

  for (const [phaseKey, phaseData] of Object.entries(allData as DataType)) {
    const prefix = PHASE_PREFIX[phaseKey] ?? phaseKey;
    const planetMap = PLANET_MAP[phaseKey] ?? {};

    for (const [sideKey, sideData] of Object.entries(phaseData)) {
      const planet = planetMap[sideKey] ?? sideKey;

      for (const [posKey, teams] of Object.entries(sideData)) {
        if (!Array.isArray(teams) || teams.length === 0) continue;

        missions.push({
          id: `${phaseKey}:${sideKey}:${posKey}`,
          phase: prefix,
          alignment: sideKey.toUpperCase(),
          position: posKey,
          label: formatPositionLabel(posKey),
          planet,
          teams: teams as TeamData[],
        });
      }
    }
  }

  return missions;
}

export function getFlatPlanets(): FlatPlanet[] {
  const planets: FlatPlanet[] = [];

  for (const [phaseKey, phaseData] of Object.entries(allData as DataType)) {
    const prefix = PHASE_PREFIX[phaseKey] ?? phaseKey;
    const planetMap = PLANET_MAP[phaseKey] ?? {};

    for (const [sideKey, sideData] of Object.entries(phaseData)) {
      const planetName = planetMap[sideKey] ?? sideKey;
      const missions: FlatMission[] = [];

      for (const [posKey, teams] of Object.entries(sideData)) {
        if (!Array.isArray(teams) || teams.length === 0) continue;

        missions.push({
          id: `${phaseKey}:${sideKey}:${posKey}`,
          phase: prefix,
          alignment: sideKey.toUpperCase(),
          position: posKey,
          label: formatPositionLabel(posKey),
          planet: planetName,
          teams: teams as TeamData[],
        });
      }

      if (missions.length > 0) {
        planets.push({
          id: `${phaseKey}:${sideKey}`,
          phase: prefix,
          alignment: ALIGNMENT_LABEL[sideKey] ?? sideKey.toUpperCase(),
          planet: planetName,
          missions,
        });
      }
    }
  }

  return planets;
}

function formatPositionLabel(key: string): string {
  const spaced = key.replace(/([a-z])([A-Z])/g, '$1 $2');
  return spaced.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ── Team eligibility ─────────────────────────────────────────────────

function isTeamEligible(
  team: TeamData,
  excludedLeads: Set<string>,
  rosterUnitMap?: Set<string> | null,
): boolean {
  // Use canonical key for exclusion check — so "Aphra (Rey)" and "Aphra (SLKR)"
  // are both excluded when the user excludes the Aphra canonical key.
  if (excludedLeads.has(canonicalLeadKey(team))) return false;

  if (rosterUnitMap && rosterUnitMap.size > 0 && team.gameId) {
    const ids = team.gameId.split(',').map(s => s.trim().toLowerCase());
    if (!ids.every(id => rosterUnitMap.has(id))) return false;
  }

  return true;
}

// ── Availability ─────────────────────────────────────────────────────

export function checkPlanetAvailability(
  planet: FlatPlanet,
  excludedLeads: Set<string>,
  rosterUnitMap?: Set<string> | null,
): PlanetAvailability {
  const available: FlatMission[] = [];
  const unavailable: FlatMission[] = [];

  for (const mission of planet.missions) {
    const hasValidTeam = mission.teams.some(t =>
      isTeamEligible(t, excludedLeads, rosterUnitMap),
    );
    if (hasValidTeam) {
      available.push(mission);
    } else {
      unavailable.push(mission);
    }
  }

  return {
    availableMissions: available,
    unavailableMissions: unavailable,
    totalCount: planet.missions.length,
    hasIssues: unavailable.length > 0,
  };
}

// ── Solver ───────────────────────────────────────────────────────────

export function solveDayForPlanets(
  selectedPlanetIds: string[],
  excludedLeads: Set<string>,
  allMissions: FlatMission[],
  rosterUnitMap?: Set<string> | null,
): SolveResult {
  const planets = getFlatPlanets();
  const planetMap = new Map(planets.map(p => [p.id, p]));

  const allMissionIds = new Set<string>();
  for (const pid of selectedPlanetIds) {
    const planet = planetMap.get(pid);
    if (planet) {
      for (const m of planet.missions) {
        allMissionIds.add(m.id);
      }
    }
  }

  return solveDay([...allMissionIds], excludedLeads, allMissions, rosterUnitMap);
}

export function solveDay(
  missionIds: string[],
  excludedLeads: Set<string>,
  allMissions: FlatMission[],
  rosterUnitMap?: Set<string> | null,
): SolveResult {
  const missionMap = new Map(allMissions.map(m => [m.id, m]));

  const available: FlatMission[] = [];
  const unavailable: FlatMission[] = [];

  for (const id of missionIds) {
    const m = missionMap.get(id);
    if (!m) continue;

    const hasValid = m.teams.some(t => isTeamEligible(t, excludedLeads, rosterUnitMap));
    if (hasValid) {
      available.push(m);
    } else {
      unavailable.push(m);
    }
  }

  if (available.length === 0) {
    return {
      assignments: [], totalScore: 0, maxPossibleScore: 0,
      unassigned: [], unavailableMissions: unavailable, infeasible: false,
    };
  }

  // Gather candidates with canonical lead keys
  const missionCandidates: { missionIdx: number; leadKey: string; team: TeamData }[] = [];

  available.forEach((mission, mi) => {
    for (const team of mission.teams) {
      if (!isTeamEligible(team, excludedLeads, rosterUnitMap)) continue;
      missionCandidates.push({
        missionIdx: mi,
        leadKey: canonicalLeadKey(team),
        team,
      });
    }
  });

  const leadList = [...new Set(missionCandidates.map(c => c.leadKey))];

  const n = available.length;
  const m = leadList.length;

  if (m < n) {
    return {
      assignments: [], totalScore: 0, maxPossibleScore: 0,
      unassigned: available, unavailableMissions: unavailable, infeasible: true,
    };
  }

  const leadToIdx = new Map(leadList.map((l, i) => [l, i]));
  let maxPossibleScore = 0;

  const costMatrix: number[][] = available.map((_, mi) => {
    const row = new Array(m).fill(INVALID_COST);
    for (const cand of missionCandidates) {
      if (cand.missionIdx === mi) {
        const col = leadToIdx.get(cand.leadKey)!;
        const cost = teamCost(cand.team);
        if (cost < row[col]) row[col] = cost;
      }
    }
    const bestCost = Math.min(...row);
    maxPossibleScore += 100 - bestCost;
    return row;
  });

  const assignment = hungarian(costMatrix);

  const assignments: PlannerAssignment[] = [];
  let totalScore = 0;

  for (let mi = 0; mi < n; mi++) {
    const col = assignment[mi];
    if (col < 0 || col >= m) continue;

    const mission = available[mi];
    const leadKey = leadList[col];
    const cand = missionCandidates.find(c => c.missionIdx === mi && c.leadKey === leadKey);
    if (!cand) continue;

    const score = teamScore(cand.team);
    totalScore += score;

    assignments.push({
      missionId: mission.id,
      missionLabel: mission.label,
      phase: mission.phase,
      alignment: mission.alignment,
      position: mission.position,
      lead: cand.team.lead,           // original display label (e.g. "Aphra (Rey)")
      leadFull: cand.team.leadFull,
      others: cand.team.others,
      successRate: cand.team.successRate,
      score,
      icon: cand.team.icon,
    });
  }

  const assignedIds = new Set(assignments.map(a => a.missionId));
  const unassigned = available.filter(m => !assignedIds.has(m.id));

  return {
    assignments, totalScore, maxPossibleScore,
    unassigned, unavailableMissions: unavailable, infeasible: false,
  };
}

// ── All leads helper ─────────────────────────────────────────────────

/**
 * Get all unique leads across all missions, deduplicated by canonical key.
 * Returns a map from canonical key → display info.
 */
export function getAllLeads(): Map<string, LeadInfo> {
  const map = new Map<string, LeadInfo>();
  const missions = getFlatMissions();
  for (const m of missions) {
    for (const t of m.teams) {
      const key = canonicalLeadKey(t);
      const existing = map.get(key);

      // Prefer the best display name: leadFull > lead (no parens) > canonicalLeadDisplay
      const newDisplay = bestTeamDisplay(t, key);
      if (!existing) {
        map.set(key, { key, display: newDisplay, icon: t.icon });
      } else {
        // Prefer entry with an icon
        if (!existing.icon && t.icon) {
          existing.icon = t.icon;
        }
      }
    }
  }
  return map;
}

/**
 * Pick the best human-readable display name from a team entry.
 * Prefers: leadFull > short lead (without parentheticals) > derived from canonical key.
 */
function bestTeamDisplay(team: TeamData, canonicalKey: string): string {
  if (team.leadFull) return team.leadFull;

  // If lead has no parentheticals, it's already clean
  if (!team.lead.includes('(')) return team.lead;

  // Fall back to canonical key display
  return canonicalLeadDisplay(canonicalKey);
}
