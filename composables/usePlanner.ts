import { useLocalStorage } from '@vueuse/core';
import {
  getFlatMissions,
  getFlatPlanets,
  getAllLeads,
  solveDay,
  checkPlanetAvailability,
  type FlatPlanet,
  type SolveResult,
} from '~/util/plannerHelpers';

const DAYS = 6;

export interface DayState {
  selectedMissions: string[];
  result: SolveResult | null;
}

export function usePlanner() {
  // ── Persisted state ────────────────────────────────────────────
  const dayStates = useLocalStorage<DayState[]>(
    'swgoh-rote-planner-days-v3',
    Array.from({ length: DAYS }, () => ({
      selectedMissions: [] as string[],
      result: null,
    })),
  );

  const excludedLeads = useLocalStorage<string[]>(
    'swgoh-rote-planner-excluded',
    [],
  );

  // ── Derived data ───────────────────────────────────────────────
  const allMissions = computed(() => getFlatMissions());
  const allPlanets = computed(() => getFlatPlanets());
  const allLeads = computed(() => getAllLeads());

  const missionMap = computed(() => {
    const map = new Map<string, (typeof allMissions.value)[number]>();
    for (const m of allMissions.value) map.set(m.id, m);
    return map;
  });

  const planetMap = computed(() => {
    const map = new Map<string, FlatPlanet>();
    for (const p of allPlanets.value) map.set(p.id, p);
    return map;
  });

  const leadOptions = computed(() => {
    return [...allLeads.value.entries()]
      .map(([key, team]) => ({
        key,
        label: team.leadFull || team.lead,
        icon: team.icon,
        excluded: excludedLeads.value.includes(key),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  });

  const excludedSet = computed(() => new Set(excludedLeads.value));

  // ── Mission-level selection ───────────────────────────────────

  function isMissionSelected(dayIndex: number, missionId: string): boolean {
    return dayStates.value[dayIndex]?.selectedMissions.includes(missionId) ?? false;
  }

  function toggleMission(dayIndex: number, missionId: string) {
    const state = dayStates.value[dayIndex];
    if (!state) return;
    const idx = state.selectedMissions.indexOf(missionId);
    if (idx === -1) {
      state.selectedMissions.push(missionId);
    } else {
      state.selectedMissions.splice(idx, 1);
    }
    state.result = null;
    dayStates.value = [...dayStates.value];
  }

  // ── Planet-level bulk toggle ──────────────────────────────────

  /** Returns { selected, total } for a planet on a given day. */
  function planetSelectionCount(dayIndex: number, planetId: string): { selected: number; total: number } {
    const planet = planetMap.value.get(planetId);
    if (!planet) return { selected: 0, total: 0 };
    const total = planet.missions.length;
    const selectedMissions = dayStates.value[dayIndex]?.selectedMissions ?? [];
    const selectedSet = new Set(selectedMissions);
    let selected = 0;
    for (const m of planet.missions) {
      if (selectedSet.has(m.id)) selected++;
    }
    return { selected, total };
  }

  /** Bulk toggle: if all missions are selected → deselect all, else → select all. */
  function togglePlanet(dayIndex: number, planetId: string) {
    const state = dayStates.value[dayIndex];
    if (!state) return;
    const planet = planetMap.value.get(planetId);
    if (!planet) return;

    const { selected, total } = planetSelectionCount(dayIndex, planetId);
    const missionIdSet = new Set(planet.missions.map(m => m.id));

    if (selected === total) {
      // Deselect all missions of this planet
      state.selectedMissions = state.selectedMissions.filter(id => !missionIdSet.has(id));
    } else {
      // Select all missions of this planet
      for (const m of planet.missions) {
        if (!state.selectedMissions.includes(m.id)) {
          state.selectedMissions.push(m.id);
        }
      }
    }

    state.result = null;
    dayStates.value = [...dayStates.value];
  }

  // ── Exclusions ────────────────────────────────────────────────
  function toggleExcludedLead(leadKey: string) {
    const idx = excludedLeads.value.indexOf(leadKey);
    if (idx === -1) {
      excludedLeads.value.push(leadKey);
    } else {
      excludedLeads.value.splice(idx, 1);
    }
    for (const state of dayStates.value) {
      state.result = null;
    }
  }

  function getPlanetAvailability(planetId: string, rosterUnitMap?: Set<string> | null) {
    const planet = planetMap.value.get(planetId);
    if (!planet) return null;
    return checkPlanetAvailability(planet, excludedSet.value, rosterUnitMap);
  }

  // ── Solver ────────────────────────────────────────────────────
  function solve(dayIndex: number, rosterUnitMap?: Set<string> | null) {
    const state = dayStates.value[dayIndex];
    if (!state || state.selectedMissions.length === 0) return;

    state.result = solveDay(
      state.selectedMissions,
      excludedSet.value,
      allMissions.value,
      rosterUnitMap,
    );
    dayStates.value = [...dayStates.value];
  }

  function solveAll(rosterUnitMap?: Set<string> | null) {
    for (let i = 0; i < DAYS; i++) {
      const state = dayStates.value[i];
      if (state && state.selectedMissions.length > 0) {
        state.result = solveDay(
          state.selectedMissions,
          excludedSet.value,
          allMissions.value,
          rosterUnitMap,
        );
      }
    }
    dayStates.value = [...dayStates.value];
  }

  function clearDay(dayIndex: number) {
    dayStates.value[dayIndex] = { selectedMissions: [], result: null };
    dayStates.value = [...dayStates.value];
  }

  function clearAll() {
    for (let i = 0; i < DAYS; i++) {
      dayStates.value[i] = { selectedMissions: [], result: null };
    }
    excludedLeads.value = [];
    dayStates.value = [...dayStates.value];
  }

  return {
    DAYS,
    dayStates,
    allMissions,
    allPlanets,
    planetMap,
    allLeads,
    leadOptions,
    excludedLeads,
    excludedSet,
    isMissionSelected,
    toggleMission,
    planetSelectionCount,
    togglePlanet,
    toggleExcludedLead,
    getPlanetAvailability,
    solve,
    solveAll,
    clearDay,
    clearAll,
  };
}
