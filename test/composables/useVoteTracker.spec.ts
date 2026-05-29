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

vi.mock("aws-amplify/data", () => ({
  generateClient: () => ({
    models: {
      TeamVote: {
        list: mockList,
        update: mockUpdate,
        create: mockCreate,
      },
    },
  }),
}));

import { useVoteTracker } from "~/composables/useVoteTracker";

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
    // Default: list returns empty (no existing votes) — tests override as needed
    mockList.mockResolvedValue({ data: [], errors: null });
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
      mockListReturns([{ id: "id-1", teamKey: "P1|DS|Top|Rey", votes: 1 }]);
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

    it("updates vote count to 2 when upvoting an existing entry", async () => {
      mockListReturns([{ id: "existing", teamKey: "P1|DS|Top|Rey", votes: 1 }]);
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(mockUpdate).toHaveBeenCalledWith({
        id: "existing",
        votes: 2,
      });
    });

    it("undoes the upvote when clicked again (removes from localStorage, subtracts 1)", async () => {
      // First upvote
      mockCreateReturns("id-1");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      // Second click = undo
      mockListReturns([{ id: "existing", teamKey: "P1|DS|Top|Rey", votes: 1 }]);
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(mockUpdate).toHaveBeenCalledWith({
        id: "existing",
        votes: 0,
      });
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(false);
    });

    it("switches downvote to upvote (delta +2)", async () => {
      // First downvote
      mockCreateReturns("id-d");
      await tracker.downvote("P1", "DS", "Top", "Rey");

      // Then upvote = switch
      mockListReturns([
        { id: "existing", teamKey: "P1|DS|Top|Rey", votes: -1 },
      ]);
      await tracker.upvote("P1", "DS", "Top", "Rey");

      expect(mockUpdate).toHaveBeenCalledWith({
        id: "existing",
        votes: 1,
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

    it("updates vote count to -2 when downvoting an existing entry", async () => {
      mockListReturns([
        { id: "existing", teamKey: "P1|DS|Top|Rey", votes: -1 },
      ]);
      await tracker.downvote("P1", "DS", "Top", "Rey");

      expect(mockUpdate).toHaveBeenCalledWith({
        id: "existing",
        votes: -2,
      });
    });

    it("undoes the downvote when clicked again (adds 1)", async () => {
      // First downvote
      mockCreateReturns("id-1");
      await tracker.downvote("P1", "DS", "Top", "Rey");

      // Second click = undo
      mockListReturns([
        { id: "existing", teamKey: "P1|DS|Top|Rey", votes: -1 },
      ]);
      await tracker.downvote("P1", "DS", "Top", "Rey");

      expect(mockUpdate).toHaveBeenCalledWith({
        id: "existing",
        votes: 0,
      });
      expect(tracker.hasVoted("P1", "DS", "Top", "Rey")).toBe(false);
    });

    it("switches upvote to downvote (delta -2)", async () => {
      // First upvote
      mockCreateReturns("id-u");
      await tracker.upvote("P1", "DS", "Top", "Rey");

      // Then downvote = switch
      mockListReturns([
        { id: "existing", teamKey: "P1|DS|Top|Rey", votes: 1 },
      ]);
      await tracker.downvote("P1", "DS", "Top", "Rey");

      expect(mockUpdate).toHaveBeenCalledWith({
        id: "existing",
        votes: -1,
      });
      expect(tracker.votedTeams.value["P1|DS|Top|Rey"]).toBe("down");
    });
  });

  // ──────────────────────────────────────────────────────────────
  // fetchVotes
  // ──────────────────────────────────────────────────────────────
  describe("fetchVotes", () => {
    it("fetches all TeamVotes and filters by prefix", async () => {
      mockListReturns([
        { id: "1", teamKey: "P1|DS|Top|Rey", votes: 5 },
        { id: "2", teamKey: "P1|DS|Top|SLKR", votes: 3 },
        { id: "3", teamKey: "P1|DS|Bottom|LV", votes: 7 },
        { id: "4", teamKey: "P2|LS|Mid|JMK", votes: 10 },
      ]);

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({
        "P1|DS|Top|Rey": 5,
        "P1|DS|Top|SLKR": 3,
      });
    });

    it("merges with existing vote counts", async () => {
      tracker.voteCounts.value = { "P1|DS|Top|Rey": 2 };

      mockListReturns([
        { id: "1", teamKey: "P1|DS|Top|SLKR", votes: 8 },
      ]);

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({
        "P1|DS|Top|Rey": 2,
        "P1|DS|Top|SLKR": 8,
      });
    });

    it("survives empty results", async () => {
      mockListReturns([]);
      tracker.voteCounts.value = { existing: 1 };

      await tracker.fetchVotes("P1", "DS", "Top");

      expect(tracker.voteCounts.value).toEqual({ existing: 1 });
    });

    it("sets isLoading during fetch", async () => {
      let resolveList: (value: any) => void;
      mockList.mockReturnValue(
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
