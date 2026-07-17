import { data as allData } from '~/data/data';
import type { data as TeamData, DataType } from '~/models/data';
import { successRate } from '~/models/data';
import { PHASE_RELIC_REQUIREMENTS } from '~/util/rosterUtils';
import { leads } from '~/data/leads';
import { GAME_ID_DISPLAY_NAMES, formatGameIdForDisplay, getCharacterIcon } from '~/data/displayNames';
import { MISSION_MULTIPLIERS } from '~/data/missionMultipliers';
import { hungarian } from '~/util/solver';

// ── Feature toggles ────────────────────────────────────────────────

/** When true, community-submitted teams (with a `creator` field) are excluded from the solver. */
export const EXCLUDE_COMMUNITY_TEAMS = true;

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
  gameId: string | undefined;
  others: string;
  successRate: string | undefined;
  score: number;
  icon: string | undefined;
  notes: string;
  videos: { url: string; creator?: string }[];
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

// Sides that should appear as their own phase row, not grouped under parent phase
const SIDE_PHASE_OVERRIDE: Record<string, string> = {
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

/** All character keys from a team's gameId (comma-separated). */
function getCharKeys(team: TeamData): string[] {
  if (team.gameId) {
    return team.gameId.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
  }
  return [canonicalLeadKey(team)];
}

// ── Score mapping ────────────────────────────────────────────────────

/** Check that all characters in a team's gameId meet the relic requirement for a phase. */
function meetsRelicReq(team: TeamData, phase: string, relicTierMap: Map<string, number>): boolean {
  const required = PHASE_RELIC_REQUIREMENTS[phase];
  if (required === undefined) return true;
  const ids = team.gameId?.split(',').map(s => s.trim().toLowerCase()).filter(Boolean) ?? [];
  if (ids.length === 0) return true;
  return ids.every(id => {
    const relic = relicTierMap.get(id);
    return relic !== undefined && relic >= required;
  });
}

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
      const phase = SIDE_PHASE_OVERRIDE[sideKey] ?? prefix;
      const planet = planetMap[sideKey] ?? sideKey;

      for (const [posKey, teams] of Object.entries(sideData)) {
        if (!Array.isArray(teams) || teams.length === 0) continue;

        const baseId = `${phaseKey}:${sideKey}:${posKey}`;
        const mult = MISSION_MULTIPLIERS[baseId] ?? 1;

        for (let copy = 1; copy <= mult; copy++) {
          const suffix = mult > 1 ? `:${copy}` : '';
          missions.push({
            id: `${baseId}${suffix}`,
            phase,
            alignment: sideKey.toUpperCase(),
            position: posKey,
            label: mult > 1 ? `${formatPositionLabel(posKey)} ${copy}` : formatPositionLabel(posKey),
            planet,
            teams: teams as TeamData[],
          });
        }
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
      const phase = SIDE_PHASE_OVERRIDE[sideKey] ?? prefix;
      const planetName = planetMap[sideKey] ?? sideKey;
      const missions: FlatMission[] = [];

      for (const [posKey, teams] of Object.entries(sideData)) {
        if (!Array.isArray(teams) || teams.length === 0) continue;

        const baseId = `${phaseKey}:${sideKey}:${posKey}`;
        const mult = MISSION_MULTIPLIERS[baseId] ?? 1;

        for (let copy = 1; copy <= mult; copy++) {
          const suffix = mult > 1 ? `:${copy}` : '';
          missions.push({
            id: `${baseId}${suffix}`,
            phase,
            alignment: sideKey.toUpperCase(),
            position: posKey,
            label: mult > 1 ? `${formatPositionLabel(posKey)} ${copy}` : formatPositionLabel(posKey),
            planet: planetName,
            teams: teams as TeamData[],
          });
        }
      }

      if (missions.length > 0) {
        planets.push({
          id: `${phaseKey}:${sideKey}`,
          phase,
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

export function isTeamEligible(
  team: TeamData,
  excludedLeads: Set<string>,
  rosterUnitMap?: Set<string> | null,
): boolean {
  // Check all character keys — any excluded character makes the team ineligible
  for (const key of getCharKeys(team)) {
    if (excludedLeads.has(key)) return false;
  }

  if (rosterUnitMap && rosterUnitMap.size > 0 && team.gameId) {
    const ids = team.gameId.split(',').map(s => s.trim().toLowerCase());
    if (!ids.every(id => rosterUnitMap.has(id))) return false;
  }

  // Exclude community-submitted teams when toggle is on
  if (EXCLUDE_COMMUNITY_TEAMS && team.creator) return false;

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
  relicTierMap?: Map<string, number> | null,
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

  return solveDay([...allMissionIds], excludedLeads, allMissions, rosterUnitMap, relicTierMap);
}

export function solveDay(
  missionIds: string[],
  excludedLeads: Set<string>,
  allMissions: FlatMission[],
  rosterUnitMap?: Set<string> | null,
  relicTierMap?: Map<string, number> | null,
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

  // Gather candidates with all character keys (not just lead)
  const missionCandidates: {
    missionIdx: number;
    charKeys: string[];
    team: TeamData;
  }[] = [];

  available.forEach((mission, mi) => {
    for (const team of mission.teams) {
      if (!isTeamEligible(team, excludedLeads, rosterUnitMap)) continue;
      // Relic check: all required characters must meet the phase's relic requirement
      if (relicTierMap && relicTierMap.size > 0 && !meetsRelicReq(team, mission.phase, relicTierMap)) continue;
      const keys = team.gameId
        ? team.gameId.split(',').map(s => s.trim().toLowerCase()).filter(Boolean)
        : [canonicalLeadKey(team)];
      missionCandidates.push({ missionIdx: mi, charKeys: keys, team });
    }
  });

  const n = available.length;

  // Sort missions by candidate count (fewest first) for branching efficiency
  const missionOrder = available.map((_, i) => i).sort((a, b) => {
    const aCount = missionCandidates.filter(c => c.missionIdx === a).length;
    const bCount = missionCandidates.filter(c => c.missionIdx === b).length;
    return aCount - bCount;
  });

  const candidatesByMission = missionOrder.map(mi =>
    missionCandidates.filter(c => c.missionIdx === mi),
  );

  // Compute max possible score (ignoring conflicts)
  let maxPossibleScore = 0;
  for (let mi = 0; mi < n; mi++) {
    let best = 0;
    for (const c of missionCandidates) {
      if (c.missionIdx === mi) {
        const s = teamScore(c.team);
        if (s > best) best = s;
      }
    }
    maxPossibleScore += best;
  }

  // Backtracking solver — respects all character keys in gameId, not just lead
  const ASSIGNMENT_BONUS = 1000; // prefer assigning more missions

  let bestScore = -1;
  let bestAssignments: typeof missionCandidates = [];

  function backtrack(
    depth: number,
    usedChars: Set<string>,
    currentAssignments: typeof missionCandidates,
    currentScore: number,
  ) {
    if (depth === candidatesByMission.length) {
      if (currentScore > bestScore) {
        bestScore = currentScore;
        bestAssignments = [...currentAssignments];
      }
      return;
    }

    // Pruning: max possible additional score
    let maxRemaining = 0;
    for (let d = depth; d < candidatesByMission.length; d++) {
      let bestForMission = 0;
      for (const c of candidatesByMission[d]) {
        const s = teamScore(c.team) + ASSIGNMENT_BONUS;
        if (s > bestForMission) bestForMission = s;
      }
      maxRemaining += bestForMission;
    }
    if (currentScore + maxRemaining <= bestScore) return;

    // Try each non-conflicting candidate
    let anyAssigned = false;
    for (const c of candidatesByMission[depth]) {
      if (c.charKeys.some(k => usedChars.has(k))) continue;

      anyAssigned = true;
      const newUsed = new Set(usedChars);
      for (const k of c.charKeys) newUsed.add(k);

      backtrack(
        depth + 1,
        newUsed,
        [...currentAssignments, c],
        currentScore + teamScore(c.team) + ASSIGNMENT_BONUS,
      );
    }

    // Skip mission if no valid team available
    if (!anyAssigned) {
      backtrack(depth + 1, usedChars, currentAssignments, currentScore);
    }
  }

  backtrack(0, new Set<string>(), [], 0);

  if (bestAssignments.length === 0) {
    return {
      assignments: [], totalScore: 0, maxPossibleScore,
      unassigned: available, unavailableMissions: unavailable, infeasible: true,
    };
  }

  // Build result
  const assignments: PlannerAssignment[] = [];
  let totalScore = 0;

  for (const c of bestAssignments) {
    const mission = available[c.missionIdx];
    const score = teamScore(c.team);
    totalScore += score;

    assignments.push({
      missionId: mission.id,
      missionLabel: mission.label,
      phase: mission.phase,
      alignment: mission.alignment,
      position: mission.position,
      lead: c.team.lead,
      leadFull: c.team.leadFull,
      gameId: c.team.gameId,
      others: c.team.others,
      successRate: c.team.successRate,
      score,
      icon: c.team.icon,
      notes: c.team.notes,
      videos: c.team.videos || [],
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
 * Get all unique characters (leads AND required squad members) across all
 * missions.  Returns a map from character key → display info, so the
 * exclusion UI can toggle any character that appears in a team's gameId.
 */
export function getAllLeads(): Map<string, LeadInfo> {
  const map = new Map<string, LeadInfo>();
  const missions = getFlatMissions();
  for (const m of missions) {
    for (const t of m.teams) {
      for (const key of getCharKeys(t)) {
        if (!map.has(key)) {
          map.set(key, {
            key,
            display: canonicalLeadDisplay(key),
            icon: getCharacterIcon(key) || t.icon,
          });
        } else if (!map.get(key)!.icon) {
          map.get(key)!.icon = getCharacterIcon(key) || t.icon;
        }
      }
    }
  }
  return map;
}
