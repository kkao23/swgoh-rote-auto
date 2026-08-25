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
import { SHIP_GAME_IDS } from '~/data/displayNames';

const DAYS = 6;

export interface DayState {
  selectedMissions: string[];
  excludedLeads: string[];
  result: SolveResult | null;
}

function emptyDay(): DayState {
  return { selectedMissions: [], excludedLeads: [], result: null };
}

export function usePlanner() {
  const dayStates = useLocalStorage<DayState[]>(
    'swgoh-rote-planner-days-v4',
    Array.from({ length: DAYS }, () => emptyDay()),
  );

  const allMissions = computed(() => getFlatMissions());
  const allPlanets = computed(() => getFlatPlanets());
  const allLeads = computed(() => getAllLeads());

  const planetMap = computed(() => {
    const map = new Map<string, FlatPlanet>();
    for (const p of allPlanets.value) map.set(p.id, p);
    return map;
  });

  function getDayLeadOptions(dayIndex: number, relicTierMap?: Map<string, number> | null) {
    const excluded = new Set(dayStates.value[dayIndex]?.excludedLeads ?? []);
    return [...allLeads.value.values()]
      .map((lead) => {
        let relicStatus: 'owned' | 'below_relic' | 'unowned' | null = null;
        if (relicTierMap && relicTierMap.size > 0) {
          const relic = relicTierMap.get(lead.key);
          if (relic === undefined || relic < 0) {
            relicStatus = 'unowned';
          } else if (SHIP_GAME_IDS.has(lead.key)) {
            relicStatus = 'owned'; // ships don't have relics — 7★ is enough
          } else if (relic < 5) {
            relicStatus = 'below_relic';
          } else {
            relicStatus = 'owned';
          }
        }
        return {
          key: lead.key,
          label: lead.display,
          icon: lead.icon,
          excluded: excluded.has(lead.key),
          relicStatus,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }

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

  function togglePlanet(dayIndex: number, planetId: string) {
    const state = dayStates.value[dayIndex];
    if (!state) return;
    const planet = planetMap.value.get(planetId);
    if (!planet) return;
    const { selected, total } = planetSelectionCount(dayIndex, planetId);
    const missionIdSet = new Set(planet.missions.map(m => m.id));
    if (selected === total) {
      state.selectedMissions = state.selectedMissions.filter(id => !missionIdSet.has(id));
    } else {
      for (const m of planet.missions) {
        if (!state.selectedMissions.includes(m.id)) {
          state.selectedMissions.push(m.id);
        }
      }
    }
    state.result = null;
    dayStates.value = [...dayStates.value];
  }

  function toggleExcludedLead(dayIndex: number, leadKey: string) {
    const state = dayStates.value[dayIndex];
    if (!state) return;
    const idx = state.excludedLeads.indexOf(leadKey);
    if (idx === -1) {
      state.excludedLeads.push(leadKey);
    } else {
      state.excludedLeads.splice(idx, 1);
    }
    state.result = null;
    dayStates.value = [...dayStates.value];
  }

  function getDayExcludedSet(dayIndex: number): Set<string> {
    return new Set(dayStates.value[dayIndex]?.excludedLeads ?? []);
  }

  function getPlanetAvailability(
    dayIndex: number,
    planetId: string,
    rosterUnitMap?: Set<string> | null,
    relicTierMap?: Map<string, number> | null,
  ) {
    const planet = planetMap.value.get(planetId);
    if (!planet) return null;
    return checkPlanetAvailability(planet, getDayExcludedSet(dayIndex), rosterUnitMap, relicTierMap);
  }

  function solve(dayIndex: number, rosterUnitMap?: Set<string> | null, relicTierMap?: Map<string, number> | null) {
    const state = dayStates.value[dayIndex];
    if (!state || state.selectedMissions.length === 0) return;
    state.result = solveDay(
      state.selectedMissions,
      getDayExcludedSet(dayIndex),
      allMissions.value,
      rosterUnitMap,
      relicTierMap,
    );
    dayStates.value = [...dayStates.value];
  }

  function solveAll(rosterUnitMap?: Set<string> | null, relicTierMap?: Map<string, number> | null) {
    for (let i = 0; i < DAYS; i++) {
      const state = dayStates.value[i];
      if (state && state.selectedMissions.length > 0) {
        state.result = solveDay(
          state.selectedMissions,
          getDayExcludedSet(i),
          allMissions.value,
          rosterUnitMap,
          relicTierMap,
        );
      }
    }
    dayStates.value = [...dayStates.value];
  }

  function clearDay(dayIndex: number) {
    dayStates.value[dayIndex] = emptyDay();
    dayStates.value = [...dayStates.value];
  }

  function setDayPlan(dayIndex: number, missionIds: string[]) {
    const state = dayStates.value[dayIndex];
    if (!state) return;
    state.selectedMissions = [...new Set(missionIds)];
    state.result = null;
    dayStates.value = [...dayStates.value];
  }

  function clearAll() {
    for (let i = 0; i < DAYS; i++) {
      dayStates.value[i] = emptyDay();
    }
    dayStates.value = [...dayStates.value];
  }

  return {
    DAYS,
    dayStates,
    allMissions,
    allPlanets,
    planetMap,
    allLeads,
    getDayLeadOptions,
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
    setDayPlan,
  };
}
