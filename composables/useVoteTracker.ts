import { useLocalStorage } from "@vueuse/core";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

/**
 * Lightweight vote tracker composable — singleton shared state.
 *
 * Tracks upvote/downvote state per team in localStorage so each browser
 * can only vote once per team.  Vote counts are fetched from the AppSync
 * backend (DynamoDB → TeamVote table) on demand.
 */
const voteCounts = ref<Record<string, number>>({});
const isLoading = ref(false);

export function useVoteTracker() {
  const client = generateClient<Schema>();

  const votedTeams = useLocalStorage<Record<string, "up" | "down">>(
    "swgoh-rote-voted-teams",
    {}
  );

  function getTeamKey(
    phase: string,
    alignment: string,
    position: string,
    lead: string
  ): string {
    return `${phase}|${alignment}|${position}|${lead}`;
  }

  function hasVoted(
    phase: string,
    alignment: string,
    position: string,
    lead: string
  ): boolean {
    return getTeamKey(phase, alignment, position, lead) in votedTeams.value;
  }

  async function fetchVotes(
    phase: string,
    alignment: string,
    position: string
  ): Promise<void> {
    isLoading.value = true;
    try {
      const prefix = `${phase}|${alignment}|${position}|`;
      const { data: items, errors } = await client.models.TeamVote.list();

      if (errors) {
        console.error("Failed to fetch vote counts:", errors);
        return;
      }

      const counts: Record<string, number> = {};
      for (const item of items ?? []) {
        if (item.teamKey?.startsWith(prefix)) {
          counts[item.teamKey] = item.votes ?? 0;
        }
      }

      voteCounts.value = { ...voteCounts.value, ...counts };
    } catch (err) {
      console.error("useVoteTracker: fetchVotes failed", err);
    } finally {
      isLoading.value = false;
    }
  }

  async function submitVote(teamKey: string, delta: number): Promise<void> {
    const { data: existing } = await client.models.TeamVote.list({
      filter: { teamKey: { eq: teamKey } },
    });

    const record = existing?.[0];

    if (record) {
      const newVotes = (record.votes ?? 0) + delta;
      await client.models.TeamVote.update({ id: record.id, votes: newVotes });
      voteCounts.value[teamKey] = newVotes;
    } else {
      const newVotes = delta;
      const result = await client.models.TeamVote.create({
        teamKey,
        votes: newVotes,
      });
      if (result.data) {
        voteCounts.value[teamKey] = newVotes;
      }
    }
  }

  async function upvote(
    phase: string,
    alignment: string,
    position: string,
    lead: string
  ): Promise<void> {
    const key = getTeamKey(phase, alignment, position, lead);
    const current = votedTeams.value[key];

    if (current === "up") {
      // Undo
      delete votedTeams.value[key];
      await submitVote(key, -1);
    } else if (current === "down") {
      // Switch down → up
      votedTeams.value[key] = "up";
      await submitVote(key, 2);
    } else {
      // New upvote
      votedTeams.value[key] = "up";
      await submitVote(key, 1);
    }
  }

  async function downvote(
    phase: string,
    alignment: string,
    position: string,
    lead: string
  ): Promise<void> {
    const key = getTeamKey(phase, alignment, position, lead);
    const current = votedTeams.value[key];

    if (current === "down") {
      // Undo
      delete votedTeams.value[key];
      await submitVote(key, 1);
    } else if (current === "up") {
      // Switch up → down
      votedTeams.value[key] = "down";
      await submitVote(key, -2);
    } else {
      // New downvote
      votedTeams.value[key] = "down";
      await submitVote(key, -1);
    }
  }

  return {
    voteCounts,
    isLoading,
    hasVoted,
    fetchVotes,
    upvote,
    downvote,
    getTeamKey,
    votedTeams,
  };
}
