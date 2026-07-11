import { data as allData } from '~/data/data';
import type { data as TeamData, DataType } from '~/models/data';
import { successRate } from '~/models/data';
import { hungarian } from '~/util/solver';

// ── Types ────────────────────────────────────────────────────────────

export interface FlatMission {
  /** Unique key: "phase4:ds:inqs" */
  id: string;
  phase: string;
  alignment: string;
  /** Position key from data (e.g. "qira", "generic") */
  position: string;
  /** Display label for the mission */
  label: string;
  /** Planet name for context */
  planet: string;
  /** Available teams for this mission */
  teams: TeamData[];
}

export interface FlatPlanet {
  /** Unique key: "phase4:ds" */
  id: string;
  phase: string;
  alignment: string;
  planet: string;
  missions: FlatMission[];
}

export interface PlanetAvailability {
  /** Missions on this planet that have at least one valid team */
  availableMissions: FlatMission[];
  /** Missions on this planet with NO valid teams (given roster + exclusions) */
  unavailableMissions: FlatMission[];
  /** Total missions on this planet */
  totalCount: number;
  /** True if any mission is unavailable */
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
  /** Missions that had NO valid team candidates */
  unavailableMissions: FlatMission[];
  infeasible: boolean;
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
  ds: 'Dark Side',
  ls: 'Light Side',
  mixed: 'Mixed',
  zeffo: 'Zeffo',
  mandalore: 'Mandalore',
  all: 'Special',
};

export const PHASE_ORDER = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'Zeffo', 'Mandalore', 'Special'];

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

/** Walk the DataType and return a flat list of all missions. */
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

/** Walk the DataType and return planet groupings. */
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
  return spaced
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ── Team eligibility ─────────────────────────────────────────────────

function isTeamEligible(
  team: TeamData,
  excludedLeads: Set<string>,
  rosterUnitMap?: Set<string> | null,
): boolean {
  if (excludedLeads.has(team.lead.toLowerCase())) return false;

  if (rosterUnitMap && rosterUnitMap.size > 0 && team.gameId) {
    const ids = team.gameId.split(',').map(s => s.trim().toLowerCase());
    if (!ids.every(id => rosterUnitMap.has(id))) return false;
  }

  return true;
}

// ── Availability ─────────────────────────────────────────────────────

/**
 * Check which missions on a planet are available given roster + exclusions.
 * Only meaningful when roster is loaded or exclusions are set.
 */
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

/**
 * Solve the team assignment for one day.
 *
 * @param selectedPlanetIds - Planet IDs the user plans to do this day.
 * @param excludedLeads     - Leads (lowercase) the user has excluded.
 * @param allMissions       - Flat list of all available missions.
 * @param rosterUnitMap     - Optional: set of owned unit gameIds (lowercase).
 */
export function solveDayForPlanets(
  selectedPlanetIds: string[],
  excludedLeads: Set<string>,
  allMissions: FlatMission[],
  rosterUnitMap?: Set<string> | null,
): SolveResult {
  // Expand planets → missions
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

/**
 * Solve the team assignment given a list of mission IDs.
 */
export function solveDay(
  missionIds: string[],
  excludedLeads: Set<string>,
  allMissions: FlatMission[],
  rosterUnitMap?: Set<string> | null,
): SolveResult {
  const missionMap = new Map(allMissions.map(m => [m.id, m]));

  // Split into available vs unavailable
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
      assignments: [],
      totalScore: 0,
      maxPossibleScore: 0,
      unassigned: [],
      unavailableMissions: unavailable,
      infeasible: false,
    };
  }

  // Gather all candidate team leads (filtered)
  const missionCandidates: { missionIdx: number; lead: string; team: TeamData }[] = [];

  available.forEach((mission, mi) => {
    for (const team of mission.teams) {
      if (!isTeamEligible(team, excludedLeads, rosterUnitMap)) continue;
      missionCandidates.push({ missionIdx: mi, lead: team.lead.toLowerCase(), team });
    }
  });

  const leadList = [...new Set(missionCandidates.map(c => c.lead))];

  const n = available.length;
  const m = leadList.length;

  if (m < n) {
    return {
      assignments: [],
      totalScore: 0,
      maxPossibleScore: 0,
      unassigned: available,
      unavailableMissions: unavailable,
      infeasible: true,
    };
  }

  // Build cost matrix
  const leadToIdx = new Map(leadList.map((l, i) => [l, i]));
  let maxPossibleScore = 0;

  const costMatrix: number[][] = available.map((_, mi) => {
    const row = new Array(m).fill(INVALID_COST);
    for (const cand of missionCandidates) {
      if (cand.missionIdx === mi) {
        const col = leadToIdx.get(cand.lead)!;
        const cost = teamCost(cand.team);
        if (cost < row[col]) row[col] = cost;
      }
    }
    const bestCost = Math.min(...row);
    maxPossibleScore += 100 - bestCost;
    return row;
  });

  const assignment = hungarian(costMatrix);

  // Build result
  const assignments: PlannerAssignment[] = [];
  let totalScore = 0;

  for (let mi = 0; mi < n; mi++) {
    const col = assignment[mi];
    if (col < 0 || col >= m) continue;

    const mission = available[mi];
    const lead = leadList[col];
    const cand = missionCandidates.find(c => c.missionIdx === mi && c.lead === lead);
    if (!cand) continue;

    const score = teamScore(cand.team);
    totalScore += score;

    assignments.push({
      missionId: mission.id,
      missionLabel: mission.label,
      phase: mission.phase,
      alignment: mission.alignment,
      position: mission.position,
      lead: cand.team.lead,
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
    assignments,
    totalScore,
    maxPossibleScore,
    unassigned,
    unavailableMissions: unavailable,
    infeasible: false,
  };
}

// ── All leads helper ─────────────────────────────────────────────────

export function getAllLeads(): Map<string, TeamData> {
  const leadMap = new Map<string, TeamData>();
  const missions = getFlatMissions();
  for (const m of missions) {
    for (const t of m.teams) {
      const key = t.lead.toLowerCase();
      if (!leadMap.has(key)) {
        leadMap.set(key, t);
      }
    }
  }
  return leadMap;
}
