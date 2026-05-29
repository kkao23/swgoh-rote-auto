import { describe, it, expect } from "vitest";
import {
  difficulty,
  successRate,
  interactionType,
} from "~/models/data";
import {
  difficultyColor,
  difficultyIcon,
  successRateBadge,
  successRateValue,
  interactionBadge,
  interactionBadges,
  interactionComplexity,
} from "~/util/missionHelpers";

// ──────────────────────────────────────────────────────────────
// difficultyColor
// ──────────────────────────────────────────────────────────────
describe("difficultyColor", () => {
  it("returns green for VERY_EASY", () => {
    expect(difficultyColor({ difficulty: difficulty.VERY_EASY })).toBe(
      "text-green-500"
    );
  });
  it("returns blue for EASY", () => {
    expect(difficultyColor({ difficulty: difficulty.EASY })).toBe(
      "text-blue-400"
    );
  });
  it("returns yellow for CAUTION", () => {
    expect(difficultyColor({ difficulty: difficulty.CAUTION })).toBe(
      "text-yellow-600"
    );
  });
  it("returns orange for HARD", () => {
    expect(difficultyColor({ difficulty: difficulty.HARD })).toBe(
      "text-orange-600"
    );
  });
  it("returns red for NO_AUTO", () => {
    expect(difficultyColor({ difficulty: difficulty.NO_AUTO })).toBe(
      "text-red-900"
    );
  });
  it("returns hidden for unknown values", () => {
    expect(
      difficultyColor({ difficulty: 999 as difficulty })
    ).toBe("hidden");
  });
});

// ──────────────────────────────────────────────────────────────
// difficultyIcon
// ──────────────────────────────────────────────────────────────
describe("difficultyIcon", () => {
  it("returns a valid icon for every known difficulty", () => {
    const values = [
      difficulty.VERY_EASY,
      difficulty.EASY,
      difficulty.CAUTION,
      difficulty.HARD,
      difficulty.NO_AUTO,
    ];
    for (const v of values) {
      const icon = difficultyIcon({ difficulty: v });
      expect(icon).toBeTruthy();
      expect(icon).not.toBe("hidden");
      expect(icon).toMatch(/^i-heroicons-/);
    }
  });
  it("returns hidden for unknown", () => {
    expect(difficultyIcon({ difficulty: 999 as difficulty })).toBe(
      "hidden"
    );
  });
});

// ──────────────────────────────────────────────────────────────
// successRateBadge
// ──────────────────────────────────────────────────────────────
describe("successRateBadge", () => {
  it("returns a badge with icon, color, and tooltip for CONSISTENT", () => {
    const badge = successRateBadge(successRate.CONSISTENT);
    expect(badge).toEqual({
      icon: "i-heroicons-check-circle-solid",
      color: "text-green-500",
      tooltip: "Consistent 2/2 waves (100%)",
    });
  });
  it("returns a badge for NINETY_PERCENT", () => {
    const badge = successRateBadge(successRate.NINETY_PERCENT);
    expect(badge).toBeTruthy();
    expect(badge!.color).toBe("text-blue-400");
  });
  it("returns a badge for USUALLY", () => {
    const badge = successRateBadge(successRate.USUALLY);
    expect(badge).toBeTruthy();
    expect(badge!.color).toBe("text-yellow-500");
  });
  it("returns a badge for FIFTY_FIFTY", () => {
    const badge = successRateBadge(successRate.FIFTY_FIFTY);
    expect(badge).toBeTruthy();
    expect(badge!.color).toBe("text-orange-500");
  });
  it("returns a badge for UNRELIABLE", () => {
    const badge = successRateBadge(successRate.UNRELIABLE);
    expect(badge).toBeTruthy();
    expect(badge!.color).toBe("text-red-500");
  });
  it("returns null for undefined", () => {
    expect(successRateBadge(undefined)).toBeNull();
  });
  it("returns null for unknown strings", () => {
    expect(successRateBadge("garbage")).toBeNull();
  });
  it("every badge has a heroicon and a tailwind color class", () => {
    const rates = [
      successRate.CONSISTENT,
      successRate.NINETY_PERCENT,
      successRate.USUALLY,
      successRate.FIFTY_FIFTY,
      successRate.UNRELIABLE,
    ];
    for (const rate of rates) {
      const badge = successRateBadge(rate);
      expect(badge!.icon).toMatch(/^i-heroicons-/);
      expect(badge!.color).toMatch(/^text-/);
      expect(badge!.tooltip.length).toBeGreaterThan(0);
    }
  });
});

// ──────────────────────────────────────────────────────────────
// successRateValue
// ──────────────────────────────────────────────────────────────
describe("successRateValue", () => {
  it("returns lower numbers for better success rates", () => {
    expect(successRateValue(successRate.CONSISTENT)).toBe(0);
    expect(successRateValue(successRate.NINETY_PERCENT)).toBe(1);
    expect(successRateValue(successRate.USUALLY)).toBe(2);
    expect(successRateValue(successRate.FIFTY_FIFTY)).toBe(3);
    expect(successRateValue(successRate.UNRELIABLE)).toBe(4);
  });
  it("returns 5 (worst) for undefined", () => {
    expect(successRateValue(undefined)).toBe(5);
  });
  it("returns 5 for unknown strings", () => {
    expect(successRateValue("nonsense")).toBe(5);
  });
  it("is monotonically increasing with quality", () => {
    const a = successRateValue(successRate.CONSISTENT);
    const b = successRateValue(successRate.USUALLY);
    const c = successRateValue(successRate.UNRELIABLE);
    expect(a).toBeLessThan(b);
    expect(b).toBeLessThan(c);
  });
});

// ──────────────────────────────────────────────────────────────
// interactionBadge
// ──────────────────────────────────────────────────────────────
describe("interactionBadge", () => {
  it("returns a badge for TARGET_START", () => {
    const badge = interactionBadge(interactionType.TARGET_START);
    expect(badge).toEqual({
      icon: "i-heroicons-cursor-arrow-rays",
      color: "text-blue-400",
      tooltip: "Target at battle start",
    });
  });
  it("returns a badge for PAUSE_WAVE2", () => {
    const badge = interactionBadge(interactionType.PAUSE_WAVE2);
    expect(badge!.color).toBe("text-purple-400");
    expect(badge!.icon).toMatch(/pause/);
  });
  it("returns a badge for MANUAL", () => {
    const badge = interactionBadge(interactionType.MANUAL);
    expect(badge!.color).toBe("text-red-400");
    expect(badge!.icon).toMatch(/hand-raised/);
  });
  it("returns null for AUTO", () => {
    expect(interactionBadge(interactionType.AUTO)).toBeNull();
  });
  it("returns null for unknown types", () => {
    expect(interactionBadge("unknown")).toBeNull();
  });
});

// ──────────────────────────────────────────────────────────────
// interactionBadges
// ──────────────────────────────────────────────────────────────
describe("interactionBadges", () => {
  it("returns an empty array for undefined", () => {
    expect(interactionBadges(undefined)).toEqual([]);
  });
  it("returns an empty array for an empty array", () => {
    expect(interactionBadges([])).toEqual([]);
  });
  it("returns an empty array when all types are AUTO", () => {
    expect(interactionBadges([interactionType.AUTO])).toEqual([]);
  });
  it("filters out AUTO and returns only actionable badges", () => {
    const badges = interactionBadges([
      interactionType.AUTO,
      interactionType.MANUAL,
      interactionType.AUTO,
      interactionType.PAUSE_WAVE2,
    ]);
    expect(badges).toHaveLength(2);
    expect(badges[0].color).toBe("text-red-400");
    expect(badges[1].color).toBe("text-purple-400");
  });
  it("returns a single badge for a single actionable type", () => {
    const badges = interactionBadges([interactionType.TARGET_START]);
    expect(badges).toHaveLength(1);
    expect(badges[0].icon).toMatch(/cursor/);
  });
});

// ──────────────────────────────────────────────────────────────
// interactionComplexity
// ──────────────────────────────────────────────────────────────
describe("interactionComplexity", () => {
  it("returns 0 for undefined", () => {
    expect(interactionComplexity(undefined)).toBe(0);
  });
  it("returns 0 for empty array", () => {
    expect(interactionComplexity([])).toBe(0);
  });
  it("returns 0 for pure auto", () => {
    expect(
      interactionComplexity([
        interactionType.AUTO,
        interactionType.AUTO,
      ])
    ).toBe(0);
  });
  it("weights MANUAL > PAUSE_WAVE2 > TARGET_START", () => {
    expect(interactionComplexity([interactionType.MANUAL])).toBe(10);
    expect(interactionComplexity([interactionType.PAUSE_WAVE2])).toBe(5);
    expect(interactionComplexity([interactionType.TARGET_START])).toBe(3);
  });
  it("sums multiple interaction types", () => {
    const score = interactionComplexity([
      interactionType.MANUAL,
      interactionType.PAUSE_WAVE2,
    ]);
    expect(score).toBe(15);
  });
  it("ignores AUTO in the sum", () => {
    const score = interactionComplexity([
      interactionType.MANUAL,
      interactionType.AUTO,
    ]);
    expect(score).toBe(10);
  });
  it("manual + pause + target = 18", () => {
    expect(
      interactionComplexity([
        interactionType.MANUAL,
        interactionType.PAUSE_WAVE2,
        interactionType.TARGET_START,
      ])
    ).toBe(18);
  });
});
