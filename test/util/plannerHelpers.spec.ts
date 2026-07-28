import { describe, it, expect } from 'vitest';
import { successRate } from '~/models/data';
import {
  getFlatMissions,
  getFlatPlanets,
  getAllLeads,
  canonicalLeadKey,
  teamScore,
  teamCost,
  solveDay,
  solveDayForPlanets,
  checkPlanetAvailability,
} from '~/util/plannerHelpers';

describe('teamScore', () => {
  it('returns 100 for CONSISTENT', () => {
    expect(teamScore({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.CONSISTENT } as any)).toBe(100);
  });
  it('returns 90 for NINETY_PERCENT', () => {
    expect(teamScore({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.NINETY_PERCENT } as any)).toBe(90);
  });
  it('returns 70 for USUALLY', () => {
    expect(teamScore({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.USUALLY } as any)).toBe(70);
  });
  it('returns 50 for FIFTY_FIFTY', () => {
    expect(teamScore({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.FIFTY_FIFTY } as any)).toBe(50);
  });
  it('returns 10 for UNRELIABLE', () => {
    expect(teamScore({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.UNRELIABLE } as any)).toBe(10);
  });
  it('returns 50 for undefined', () => {
    expect(teamScore({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0 } as any)).toBe(50);
  });
});

describe('teamCost', () => {
  it('is the inverse of teamScore', () => {
    expect(teamCost({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.CONSISTENT } as any)).toBe(0);
    expect(teamCost({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.USUALLY } as any)).toBe(30);
    expect(teamCost({ lead: 'x', others: '', notes: '', videos: [], difficulty: 0, successRate: successRate.UNRELIABLE } as any)).toBe(90);
  });
});

describe('getFlatMissions', () => {
  it('returns a non-empty list', () => {
    expect(getFlatMissions().length).toBeGreaterThan(0);
  });

  it('every mission has required fields', () => {
    for (const m of getFlatMissions()) {
      expect(m.id).toBeTruthy();
      expect(m.phase).toBeTruthy();
      expect(m.alignment).toBeTruthy();
      expect(m.position).toBeTruthy();
      expect(m.label).toBeTruthy();
      expect(Array.isArray(m.teams)).toBe(true);
      expect(m.teams.length).toBeGreaterThan(0);
    }
  });

  it('contains known missions', () => {
    const ids = new Set(getFlatMissions().map(m => m.id));
    expect(ids.has('phase4:ds:inqs')).toBe(true);
    expect(ids.has('phase4:mixed:qira')).toBe(true);
    expect(ids.has('phase1:ds:left')).toBe(true);
  });
});

describe('getFlatPlanets', () => {
  it('returns a non-empty list', () => {
    expect(getFlatPlanets().length).toBeGreaterThan(0);
  });

  it('every planet has an id, phase, alignment, planet, and missions', () => {
    for (const p of getFlatPlanets()) {
      expect(p.id).toBeTruthy();
      expect(p.phase).toBeTruthy();
      expect(p.alignment).toBeTruthy();
      expect(p.planet).toBeTruthy();
      expect(Array.isArray(p.missions)).toBe(true);
      expect(p.missions.length).toBeGreaterThan(0);
    }
  });

  it('contains known planets', () => {
    const ids = new Set(getFlatPlanets().map(p => p.id));
    expect(ids.has('phase4:ds')).toBe(true);    // Haven
    expect(ids.has('phase4:mixed')).toBe(true); // Kessel
    expect(ids.has('phase4:ls')).toBe(true);    // Lothal
    expect(ids.has('phase4:mandalore')).toBe(true);
    expect(ids.has('phase3:zeffo')).toBe(true);
  });

  it('planet "phase4:ds" has all Haven missions', () => {
    const planet = getFlatPlanets().find(p => p.id === 'phase4:ds');
    expect(planet).toBeDefined();
    expect(planet!.planet).toBe('Haven');
    const labels = planet!.missions.map(m => m.position);
    expect(labels).toContain('inqs');
    expect(labels).toContain('midRight');
    expect(labels).toContain('sortie');
  });
});

describe('getAllLeads', () => {
  it('returns a non-empty map', () => {
    expect(getAllLeads().size).toBeGreaterThan(0);
  });

  it('contains well-known leads by canonical key', () => {
    const leads = getAllLeads();
    expect(leads.has('glleia')).toBe(true);
    expect(leads.has('supremeleaderkyloren')).toBe(true);
    expect(leads.has('jabbathehutt')).toBe(true);
  });

  it('lead info has display name and key', () => {
    const leads = getAllLeads();
    const leia = leads.get('glleia');
    expect(leia).toBeDefined();
    expect(leia!.display).toBeTruthy();
    expect(leia!.key).toBe('glleia');
  });
});

describe('solveDay', () => {
  const allMissions = getFlatMissions();

  it('returns empty for no missions', () => {
    const result = solveDay([], new Set(), allMissions, null);
    expect(result.assignments).toHaveLength(0);
    expect(result.infeasible).toBe(false);
  });

  it('solves a single mission', () => {
    const m = allMissions.find(m => m.id === 'phase4:mixed:qira')!;
    const result = solveDay([m.id], new Set(), allMissions, null);
    expect(result.assignments).toHaveLength(1);
    expect(result.totalScore).toBe(100);
  });

  it('solves two missions with distinct leads', () => {
    const qira = allMissions.find(m => m.id === 'phase4:mixed:qira')!;
    const jedi = allMissions.find(m => m.id === 'phase4:ls:jedi')!;
    const result = solveDay([qira.id, jedi.id], new Set(), allMissions, null);
    expect(result.assignments).toHaveLength(2);
    const leads = result.assignments.map(a => a.lead);
    expect(new Set(leads).size).toBe(2);
  });

  it('respects manual exclusions', () => {
    const m = allMissions.find(m => m.id === 'phase4:mixed:qira')!;
    const result = solveDay([m.id], new Set(['leia']), allMissions, null);
    expect(result.assignments).toHaveLength(1);
    expect(result.unavailableMissions).toHaveLength(0); // mission still has other leads
  });

  it('detects unavailable missions', () => {
    // Exclude ALL leads for a mission (by canonical key)
    const m = allMissions.find(m => m.id === 'phase4:mixed:qira')!;
    const allLeadKeys = new Set(m.teams.map(t => canonicalLeadKey(t)));
    const result = solveDay([m.id], allLeadKeys, allMissions, null);
    expect(result.unavailableMissions).toHaveLength(1);
    expect(result.unavailableMissions[0].id).toBe(m.id);
  });

  it('respects roster auto-filter', () => {
    const m = allMissions.find(m => m.id === 'phase4:mixed:qira')!;
    // SLKR team requires SLKR + Qira + L3_37 in its gameId
    const roster = new Set<string>(['supremeleaderkyloren', 'qira', 'l3_37']);
    const result = solveDay([m.id], new Set(), allMissions, roster);
    expect(result.assignments).toHaveLength(1);
    expect(result.assignments[0].lead.toLowerCase()).toBe('slkr');
  });

  it('produces partial assignment when not enough unique characters', () => {
    // Two copies of the same multiplied mission share a candidate pool —
    // only one can get the best team, the other gets unassigned if no alternatives exist.
    const generic1 = allMissions.find(m => m.id === 'phase4:mixed:generic:1')!;
    const generic2 = allMissions.find(m => m.id === 'phase4:mixed:generic:2')!;
    // Exclude all leads except one
    const allLeads = getAllLeads();
    const excludeAll = new Set<string>();
    for (const [key] of allLeads) {
      if (key !== 'glleia') excludeAll.add(key);
    }
    const result = solveDay([generic1.id, generic2.id], excludeAll, allMissions, null);
    // Only one Leia, two missions — one gets assigned, one is unassigned
    expect(result.assignments.length).toBe(1);
    expect(result.unassigned.length).toBe(1);
    expect(result.infeasible).toBe(false);
  });
});

describe('solveDayForPlanets', () => {
  const allMissions = getFlatMissions();

  it('expands planet ID into missions and solves', () => {
    // P4 Kessel (mixed) has: qira, generic×2, jabba, fleet → 5 missions
    const result = solveDayForPlanets(['phase4:mixed'], new Set(), allMissions, null);
    // Fleet is among the missions but "jabba" only has Jabba team
    expect(result.assignments.length).toBeGreaterThanOrEqual(4);
    expect(result.infeasible).toBe(false);
    // All leads should be distinct
    const leads = result.assignments.map(a => a.lead);
    expect(new Set(leads).size).toBe(leads.length);
  });

  it('handles multiple planets', () => {
    const result = solveDayForPlanets(['phase4:ds', 'phase4:ls'], new Set(), allMissions, null);
    expect(result.assignments.length).toBeGreaterThan(0);
    expect(result.infeasible).toBe(false);
  });

  it('marks unavailable missions within a planet', () => {
    const planets = getFlatPlanets();
    const haven = planets.find(p => p.id === 'phase4:ds')!;
    // Exclude all leads for the first mission
    const firstMission = haven.missions[0];
    const allLeads = new Set(firstMission.teams.map(t => canonicalLeadKey(t)));
    const result = solveDayForPlanets(['phase4:ds'], allLeads, allMissions, null);
    // First mission should be unavailable
    expect(result.unavailableMissions.some(m => m.id === firstMission.id)).toBe(true);
    // Other missions should still be assigned
    const remainingMissions = haven.missions.filter(m => m.id !== firstMission.id);
    expect(result.assignments.length).toBe(remainingMissions.length);
  });
});

describe('checkPlanetAvailability', () => {
  const planets = getFlatPlanets();

  it('returns all available when no exclusions and no roster', () => {
    const p = planets.find(p => p.id === 'phase4:mixed')!;
    const avail = checkPlanetAvailability(p, new Set(), null);
    expect(avail.hasIssues).toBe(false);
    expect(avail.availableMissions.length).toBe(p.missions.length);
    expect(avail.unavailableMissions.length).toBe(0);
  });

  it('marks missions unavailable when all leads excluded', () => {
    const p = planets.find(p => p.id === 'phase4:mixed')!;
    const jabbaMission = p.missions.find(m => m.position === 'jabba')!;
    // Exclude Jabba — this mission only has Jabba teams
    const avail = checkPlanetAvailability(p, new Set(['jabbathehutt']), null);
    expect(avail.hasIssues).toBe(true);
    expect(avail.unavailableMissions.some(m => m.id === jabbaMission.id)).toBe(true);
  });

  it('roster filter makes missions unavailable', () => {
    const p = planets.find(p => p.id === 'phase4:mixed')!;
    const jabbaMission = p.missions.find(m => m.position === 'jabba')!;
    // Own nothing → Jabba mission unavailable (only Jabba-lead teams)
    const roster = new Set<string>(['nobody']);
    const avail = checkPlanetAvailability(p, new Set(), roster);
    expect(avail.unavailableMissions.some(m => m.id === jabbaMission.id)).toBe(true);
  });
});
