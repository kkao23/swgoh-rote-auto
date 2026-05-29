import { difficulty, successRate, interactionType } from "~/models/data";

/**
 * Pure helper functions for mission display — badge colors, icons,
 * and sort weights.  Extracted from MissionTableFragment.vue so they
 * can be unit-tested independently of Vue reactivity.
 */

export function difficultyColor(d: { difficulty: difficulty }): string {
  switch (d.difficulty) {
    case difficulty.VERY_EASY:
      return "text-green-500";
    case difficulty.EASY:
      return "text-blue-400";
    case difficulty.CAUTION:
      return "text-yellow-600";
    case difficulty.HARD:
      return "text-orange-600";
    case difficulty.NO_AUTO:
      return "text-red-900";
    default:
      return "hidden";
  }
}

export function difficultyIcon(d: { difficulty: difficulty }): string {
  switch (d.difficulty) {
    case difficulty.VERY_EASY:
      return "i-heroicons-check-circle-solid";
    case difficulty.EASY:
      return "i-heroicons-hand-thumb-up-solid";
    case difficulty.CAUTION:
      return "i-heroicons-exclamation-triangle-solid";
    case difficulty.HARD:
      return "i-heroicons-shield-exclamation-solid";
    case difficulty.NO_AUTO:
      return "i-heroicons-x-circle-solid";
    default:
      return "hidden";
  }
}

export type SuccessRateBadge = {
  icon: string;
  color: string;
  tooltip: string;
};

export function successRateBadge(
  rate?: string
): SuccessRateBadge | null {
  switch (rate) {
    case successRate.CONSISTENT:
      return {
        icon: "i-heroicons-check-circle-solid",
        color: "text-green-500",
        tooltip: "Consistent 2/2 waves (100%)",
      };
    case successRate.NINETY_PERCENT:
      return {
        icon: "i-heroicons-hand-thumb-up-solid",
        color: "text-blue-400",
        tooltip: "Very reliable (~90%)",
      };
    case successRate.USUALLY:
      return {
        icon: "i-heroicons-exclamation-triangle-solid",
        color: "text-yellow-500",
        tooltip: "Usually works (60-80%)",
      };
    case successRate.FIFTY_FIFTY:
      return {
        icon: "i-heroicons-minus-circle-solid",
        color: "text-orange-500",
        tooltip: "50/50 - Consistent 1/2, sometimes 2/2",
      };
    case successRate.UNRELIABLE:
      return {
        icon: "i-heroicons-x-circle-solid",
        color: "text-red-500",
        tooltip: "Unreliable or cannot auto",
      };
    default:
      return null;
  }
}

export function successRateValue(rate?: string): number {
  switch (rate) {
    case successRate.CONSISTENT:
      return 0;
    case successRate.NINETY_PERCENT:
      return 1;
    case successRate.USUALLY:
      return 2;
    case successRate.FIFTY_FIFTY:
      return 3;
    case successRate.UNRELIABLE:
      return 4;
    default:
      return 5;
  }
}

export type InteractionBadge = {
  icon: string;
  color: string;
  tooltip: string;
};

export function interactionBadge(
  type: string
): InteractionBadge | null {
  switch (type) {
    case interactionType.TARGET_START:
      return {
        icon: "i-heroicons-cursor-arrow-rays",
        color: "text-blue-400",
        tooltip: "Target at battle start",
      };
    case interactionType.PAUSE_WAVE2:
      return {
        icon: "i-heroicons-pause-circle",
        color: "text-purple-400",
        tooltip: "Pause at wave 2",
      };
    case interactionType.MANUAL:
      return {
        icon: "i-heroicons-hand-raised",
        color: "text-red-400",
        tooltip: "Manual play required",
      };
    case interactionType.AUTO:
    default:
      return null;
  }
}

export function interactionBadges(
  types?: string[]
): InteractionBadge[] {
  if (!types || types.length === 0) return [];
  return types
    .map((type) => interactionBadge(type))
    .filter(
      (badge): badge is InteractionBadge => badge !== null
    );
}

export function interactionComplexity(types?: string[]): number {
  if (!types || types.length === 0) return 0;

  let complexity = 0;
  types.forEach((type) => {
    switch (type) {
      case interactionType.MANUAL:
        complexity += 10;
        break;
      case interactionType.PAUSE_WAVE2:
        complexity += 5;
        break;
      case interactionType.TARGET_START:
        complexity += 3;
        break;
      case interactionType.AUTO:
        complexity += 0;
        break;
    }
  });

  return complexity;
}
