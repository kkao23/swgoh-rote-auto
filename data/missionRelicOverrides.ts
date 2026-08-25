/** Mission-specific relic requirements that differ from the phase default.  Keyed by mission ID (phaseKey:sideKey:posKey). */
export const MISSION_RELIC_OVERRIDES: Record<string, number> = {
  'phase2:ds:geos': 7,          // P2 Geos needs R7, not R6
  'phase4:mandalore:boKatan': 9, // Mandalore Bo-Katan needs R9, not R8
  'phase2:ls:zeffo': 7,          // P2 Zeffo unlock needs R7, not R6
};
