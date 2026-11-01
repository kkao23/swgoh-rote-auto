import { describe, it, expect, beforeEach, vi } from "vitest";
import { ref } from "vue";

// ── Mock @vueuse/core ──────────────────────────────────────────
vi.mock("@vueuse/core", () => ({
  useLocalStorage: <T>(_key: string, defaultValue: T) => {
    return ref<T>(structuredClone(defaultValue)) as ReturnType<typeof ref<T>>;
  },
}));

// ── Mock aws-amplify/data ──────────────────────────────────────
const mockList = vi.fn();
const mockUpdate = vi.fn();
const mockCreate = vi.fn();
const mockSummaryList = vi.fn();

vi.mock("aws-amplify/data", () => ({
  generateClient: () => ({
    models: {
      TeamVote: {
        list: mockList,
        update: mockUpdate,
        create: mockCreate,
      },
      VoteSummary: {
        list: mockSummaryList,
      },
    },
  }),
}));

import { useVoteTracker, _resetVoteSummariesForTests } from "~/composables/useVoteTracker";

// ── Helpers ────────────────────────────────────────────────────
function mockListReturns(items: Array<{ id: string; teamKey: string; votes: number }>) {
  mockList.mockResolvedValue({ data: items, errors: null });
}

function mockCreateReturns(id: string) {
  mockCreate.mockResolvedValue({ data: { id } });
}

describe("useVoteTracker", () => {
  let tracker: ReturnType<typeof useVoteTracker>;

  beforeEach(() => {
    vi.clearAllMocks();
    tracker = useVoteTracker();
    // Reset singleton state
    tracker.voteCounts.value = {};
    // Reset module-level "loaded once" state between tests
    _resetVoteSummariesForTests();
    // Default: lists return empty — tests override as needed
    mockList.mockResolvedValue({ data: [], errors: null });
    mockSummaryList.mockResolvedValue({ data: [], errors: null });
  });

  // ──────────────────────────────────────────────────────────────
  // getTeamKey
  // ──────────────────────────────────────────────────────────────
  describe("getTeamKey", () => {
    it("generates a pipe-delimited key from phase, alignment, position, lead", () => {
      const key = tracker.getTeamKey("P1", "DS", "Top", "Rey");
      expect(key).toBe("P1|DS|Top|Rey");
    });

    it("distinguishes teams with different phases", () => {
      expect(tracker.getTeamKey("P1", "DS", "Top", "Rey")).not.toBe(
        tracker.getTeamKey("P2", "DS", "Top", "Rey")
      );
    });

    it("distinguishes teams with different alignments", () => {
      expect(tracker.getTeamKey("P1", "DS", "Top", "Rey")).not.toBe(
        tracker.getTeamKey("P1", "LS", "Top", "Rey")
      );
    });

    it("distinguishes teams with different positions", () => {
      expect(tracker.getTeamKey("P1", "DS", "Top", "Rey")).not.toBe(
        tracker.getTeamKey("P1", "DS", "Bottom", "Rey")
      );
    });

    it("distinguishes teams with different leads", () => {
      expect(tracker.getTeamKey("P1", "DS", "Top", "Rey")).not.toBe(
        tracker.getTeamKey("P1", "DS", "Top", "SLKR")
      );
    });
  });

  // ──────────────────────────────────────────────────────────────
  // hasVoted
  // ──────────────────────────────────────────────────────────────
  describe("hasVoted", () => {
    it("returns false when no vote has been cast", () => {
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(false);
    });

    it("returns true after an upvote", async () => {
      mockCreateReturns("id-1");
      await tracker.upvote("P1", "DS", "Top", "Rey");
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(true);
    });

    it("returns true after a downvote", async () => {
      mockCreateReturns("id-1");
      await tracker.downvote("P1", "DS", "Top", "Rey");
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(true);
    });

    it("returns false after an upvote is undone", async () => {
      mockCreateReturns("id-1");
      await tracker.upvote("P1", "DS", "Top", "Rey");
      mockCreateReturns("id-2");
      await tracker.upvote("P1", "DS", "Top", "Rey"); // undo
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(false);
    });
  });

  // ──────────────────────────────────────────────────────────────
  // upvote
  // ──────────────────────────────────────────────────────────────
  describe("upvote", () => {
    it("creates a new TeamVote with votes=1 on first upvote", async () => {
      mockCreateReturns("id-1");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(mockCreate).toHaveBeenCalledWith({
        teamKey: "P1|DS|Top|Rey",
        votes: 1,
      });
    });

    it("always creates a new delta row (append-only), even when rows exist", async () => {
      mockCreateReturns("id-1");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      // Another vote for the same team appends another delta row
      mockCreateReturns("id-2");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(mockCreate).toHaveBeenLastCalledWith({
        teamKey: "P1|DS|Top|Rey",
        votes: -1,
      });
      expect(mockUpdate).not.toHaveBeenCalled();
    });

    it("shows the optimistic total (loaded + delta), not just the delta", async () => {
      tracker.voteCounts.value = { "P1|DS|Top|Rey": 22 };

      mockCreateReturns("id-1");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(tracker.voteCounts.value["P1|DS|Top|Rey"]).toBe(23);
    });

    it("rolls back the optimistic total when the create fails", async () => {
      tracker.voteCounts.value = { "P1|DS|Top|Rey": 22 };
      mockCreate.mockResolvedValue({ data: null });

      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(tracker.voteCounts.value["P1|DS|Top|Rey"]).toBe(22);
    });

    it("undoes the upvote when clicked again (appends -1 delta)", async () => {
      // First upvote
      mockCreateReturns("id-1");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      // Second click = undo
      mockCreateReturns("id-2");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(mockCreate).toHaveBeenLastCalledWith({
        teamKey: "P1|DS|Top|Rey",
        votes: -1,
      });
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(false);
    });

    it("switches downvote to upvote (appends +2 delta)", async () => {
      // First downvote
      mockCreateReturns("id-d");
      await tracker.downvote("P1", "DS", "Top", "Rey");

      // Then upvote = switch
      mockCreateReturns("id-u");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(mockCreate).toHaveBeenLastCalledWith({
        teamKey: "P1|DS|Top|Rey",
        votes: 2,
      });
      expect(tracker.votedTeams.value["P1|DS|Top|Rey"]).toBe("up");
    });
  });

  // ──────────────────────────────────────────────────────────────
  // downvote
  // ──────────────────────────────────────────────────────────────
  describe("downvote", () => {
    it("creates a new TeamVote with votes=-1 on first downvote", async () => {
      mockCreateReturns("id-1");
      await tracker.downvote("P1", "DS", "Top", "Rey");

      expect(mockCreate).toHaveBeenCalledWith({
        teamKey: "P1|DS|Top|Rey",
        votes: -1,
      });
    });

    it("undoes the downvote when clicked again (appends +1)", async () => {
      // First downvote
      mockCreateReturns("id-1");
      await tracker.downvote("P1", "DS", "Top", "Rey");

      // Second click = undo
      mockCreateReturns("id-2");
      await tracker.downvote("P1", "DS", "Top", "Rey");

      expect(mockCreate).toHaveBeenLastCalledWith({
        teamKey: "P1|DS|Top|Rey",
        votes: 1,
      });
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(false);
    });

    it("switches upvote to downvote (appends -2)", async () => {
      // First upvote
      mockCreateReturns("id-u");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      // Then downvote = switch
      mockCreateReturns("id-d");
      await tracker.downvote("P1", "DS", "Top", "Rey");

      expect(mockCreate).toHaveBeenLastCalledWith({
        teamKey: "P1|DS|Top|Rey",
        votes: -2,
      });
      expect(tracker.votedTeams.value["P1|DS|Top|Rey"]).toBe("down");
    });
  });

  // ──────────────────────────────────────────────────────────────
  // fetchVotes (loads VoteSummary rows once per session)
  // ──────────────────────────────────────────────────────────────
  describe("fetchVotes", () => {
    function mockSummaries(items: Array<{ summaryKey: string; counts: any }>) {
      mockSummaryList.mockResolvedValue({ data: items, errors: null });
    }

    it("flattens VoteSummary counts into teamKeys", async () => {
      mockSummaries([
        {
          summaryKey: "P1|DS|Top",
          counts: JSON.stringify({ Rey: 5, SLKR: 3 }),
        },
        { summaryKey: "P1|DS|Bottom", counts: JSON.stringify({ LV: 7 }) },
      ]);

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({
        "P1|DS|Top|Rey": 5,
        "P1|DS|Top|SLKR": 3,
        "P1|DS|Bottom|LV": 7,
      });
      expect(mockSummaryList).toHaveBeenCalledTimes(1);
    });

    it("accepts already-parsed counts objects as well as JSON strings", async () => {
      mockSummaries([{ summaryKey: "P2|LS|Mid", counts: { JMK: 10 } }]);

      await tracker.fetchVotes("P2", "LS", "Mid");

      expect(tracker.voteCounts.value).toEqual({ "P2|LS|Mid|JMK": 10 });
    });

    it("unwraps double-encoded JSON strings (a.json read quirk)", async () => {
      mockSummaries([
        {
          summaryKey: "P1|DS|Top",
          counts: JSON.stringify(JSON.stringify({ Rey: 5 })),
        },
      ]);

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({ "P1|DS|Top|Rey": 5 });
    });

    it("merges with existing vote counts", async () => {
      tracker.voteCounts.value = { "P1|DS|Top|Rey": 2 };

      mockSummaries([
        { summaryKey: "P1|DS|Top", counts: JSON.stringify({ SLKR: 8 }) },
      ]);

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({
        "P1|DS|Top|Rey": 2,
        "P1|DS|Top|SLKR": 8,
      });
    });

    it("only fetches once per session (subsequent calls are no-ops)", async () => {
      mockSummaries([
        { summaryKey: "P1|DS|Top", counts: JSON.stringify({ Rey: 5 }) },
      ]);

      await tracker.fetchVotes("P1", "DS", "Top");
      await tracker.fetchVotes("P1", "DS", "Bottom");

      expect(mockSummaryList).toHaveBeenCalledTimes(1);
    });

    it("survives empty results", async () => {
      mockSummaries([]);
      tracker.voteCounts.value = { existing: 1 };

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({ existing: 1 });
    });

    it("skips malformed summary rows without throwing", async () => {
      mockSummaries([
        { summaryKey: "P1|DS|Top", counts: "not-json{" },
        { summaryKey: "P1|DS|Bottom", counts: null },
      ]);

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({});
    });

    it("sets isLoading during fetch", async () => {
      let resolveList: (value: any) => void;
      mockSummaryList.mockReturnValue(
        new Promise((resolve) => {
          resolveList = resolve;
        })
      );

      const promise = tracker.fetchVotes("P1", "DS", "Top");
      expect(tracker.isLoading.value).toBe(true);

      resolveList!({ data: [], errors: null });
      await promise;
      expect(tracker.isLoading.value).toBe(false);
    });

    it("allows a retry after a failed fetch", async () => {
      mockSummaryList
        .mockResolvedValueOnce({ data: [], errors: [{ message: "boom" }] })
        .mockResolvedValueOnce({
          data: [{ summaryKey: "P1|DS|Top", counts: JSON.stringify({ Rey: 5 }) }],
          errors: null,
        });

      await tracker.fetchVotes("P1", "DS", "Top");
      await tracker.fetchVotes("P1", "DS", "Top");

      expect(mockSummaryList).toHaveBeenCalledTimes(2);
      expect(tracker.voteCounts.value).toEqual({ "P1|DS|Top|Rey": 5 });
    });
  });

  // ──────────────────────────────────────────────────────────────
  // Singleton state
  // ──────────────────────────────────────────────────────────────
  describe("singleton state", () => {
    it("shares voteCounts across multiple useVoteTracker calls", () => {
      const t1 = useVoteTracker();
      const t2 = useVoteTracker();

      t1.voteCounts.value = { "P1|DS|Top|Rey": 10 };
      expect(t2.voteCounts.value).toEqual({ "P1|DS|Top|Rey": 10 });
    });

    it("shares isLoading across calls", () => {
      const t1 = useVoteTracker();
      const t2 = useVoteTracker();

      t1.isLoading.value = true;
      expect(t2.isLoading.value).toBe(true);
    });
  });

  // ──────────────────────────────────────────────────────────────
  // Team key uniqueness
  // ──────────────────────────────────────────────────────────────
  describe("team key uniqueness", () => {
    it("same parameters produce the same key", () => {
      const key1 = tracker.getTeamKey("P6", "Mixed", "BottomLeft", "Jabba");
      const key2 = tracker.getTeamKey("P6", "Mixed", "BottomLeft", "Jabba");
      expect(key1).toBe(key2);
    });

    it("keys are case-sensitive (lead names matter)", () => {
      expect(tracker.getTeamKey("P1", "DS", "Top", "rey")).not.toBe(
        tracker.getTeamKey("P1", "DS", "Top", "Rey")
      );
    });
  });
});
