import { useLocalStorage } from '@vueuse/core';

export function useSavedTeams() {
  const savedTeams = useLocalStorage<string[]>('swgoh-rote-saved-teams', []);

  function getTeamKey(phase: string, alignment: string, position: string, lead: string): string {
    return `${phase}|${alignment}|${position}|${lead}`;
  }

  function isSaved(phase: string, alignment: string, position: string, lead: string): boolean {
    return savedTeams.value.includes(getTeamKey(phase, alignment, position, lead));
  }

  function toggleSaved(phase: string, alignment: string, position: string, lead: string): void {
    const key = getTeamKey(phase, alignment, position, lead);
    const index = savedTeams.value.indexOf(key);
    if (index === -1) {
      savedTeams.value.push(key);
    } else {
      savedTeams.value.splice(index, 1);
    }
  }

  return {
    savedTeams,
    isSaved,
    toggleSaved,
  };
}
