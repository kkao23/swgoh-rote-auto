import { useLocalStorage } from "@vueuse/core";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";

/**
 * Lightweight vote tracker composable.
 *
 * Tracks upvote/downvote state per team in localStorage so each browser
 * can only vote once per team.  Vote counts are fetched from the AppSync
 * backend (DynamoDB → TeamVote table) on demand.
 *
 * @example
 * ```ts
 * const { voteCounts, hasVoted, fetchVotes, upvote, downvote } = useVoteTracker()
 *
 * // Fetch counts for teams in this mission set:
 * await fetchVotes('P1', 'DS', 'Top')
 *
 * // Display:
 * voteCounts.value['P1|DS|Top|Rey']  // → 12
 * hasVoted('P1', 'DS', 'Top', 'Rey')  // → true | false
 *
 * // Vote:
 * await upvote('P1', 'DS', 'Top', 'Rey')   // +1
 * await downvote('P1', 'DS', 'Top', 'Rey') // -1
 * ```
 */
export function useVoteTracker() {
  const client = generateClient<Schema>();

  // ── Local vote log (per-team, per-browser) ──────────────────
  const votedTeams = useLocalStorage<Record<string, "up" | "down">>(
    "swgoh-rote-voted-teams",
    {}
  );

  // ── Reactive vote counts keyed by teamKey ────────────────────
  const voteCounts = ref<Record<string, number>>({});

  // ── Loading state ────────────────────────────────────────────
  const isLoading = ref(false);

  // ── Helpers ──────────────────────────────────────────────────
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
    return (
      getTeamKey(phase, alignment, position, lead) in votedTeams.value
    );
  }

  // ── Fetch vote counts from AppSync ──────────────────────────
  async function fetchVotes(
    phase: string,
    alignment: string,
    position: string
  ): Promise<void> {
    isLoading.value = true;
    try {
      // Fetch ALL TeamVote records — the table is small (< 200 teams total).
      // We filter client-side by the phase|alignment|position prefix.
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

      voteCounts.value = {
        ...voteCounts.value,
        ...counts,
      };
    } catch (err) {
      console.error("useVoteTracker: fetchVotes failed", err);
    } finally {
      isLoading.value = false;
    }
  }

  // ── Submit a vote ───────────────────────────────────────────
  async function submitVote(
    teamKey: string,
    delta: number
  ): Promise<void> {
    // Find existing record
    const { data: existing } = await client.models.TeamVote.list({
      filter: { teamKey: { eq: teamKey } },
    });

    const record = existing?.[0];

    if (record) {
      // Update existing
      const newVotes = Math.max(0, (record.votes ?? 0) + delta);
      await client.models.TeamVote.update({
        id: record.id,
        votes: newVotes,
      });
      voteCounts.value[teamKey] = newVotes;
    } else {
      // Create new
      const newVotes = Math.max(0, delta);
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
    if (key in votedTeams.value) return; // Already voted

    votedTeams.value[key] = "up";
    await submitVote(key, 1);
  }

  async function downvote(
    phase: string,
    alignment: string,
    position: string,
    lead: string
  ): Promise<void> {
    const key = getTeamKey(phase, alignment, position, lead);
    if (key in votedTeams.value) return; // Already voted

    votedTeams.value[key] = "down";
    await submitVote(key, -1);
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
