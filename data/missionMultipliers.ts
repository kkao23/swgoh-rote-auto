/**
 * Mission multipliers — some planets have multiple copies of the same
 * combat mission.  Each entry clones that mission N times so the solver
 * assigns a distinct team to each copy.
 *
 * Key format: "phaseKey:sideKey:posKey"
 *   e.g. "phase1:ls:generic" → 2 copies
 */

export const MISSION_MULTIPLIERS: Record<string, number> = {
  // Coruscant Light Side — 2 generic combat missions
  'phase1:ls:generic': 2,

  // Dathomir Dark Side — 2 generic combat missions
  'phase3:ds:generic': 2,

  // Haven Dark Side — 3 identical Mid/Right missions
  'phase4:ds:midRight': 3,

  // Kessel Mixed — 2 generic combat missions
  'phase4:mixed:generic': 2,
};
