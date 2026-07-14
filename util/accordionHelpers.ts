import type { data as TeamData } from '~/models/data';
import { successRateValue, interactionComplexity } from '~/util/missionHelpers';

export interface AccordionItem {
  label: string;
  content: {
    others: string;
    notes: string;
    videos: { url: string; creator?: string }[];
    difficulty: number;
    omi?: boolean;
    targeted?: boolean;
    successRate?: string;
    interactionType?: string[];
    icon?: string;
    lead: string;
    gameId?: string;
    creator?: string;
    owned: boolean;
    meetsRelic: boolean;
  };
  defaultOpen: boolean;
}

export interface AccordionOptions {
  data: TeamData[];
  phase: string;
  alignment: string;
  position: string;
  isSaved: (phase: string, alignment: string, position: string, lead: string) => boolean;
  voteCounts: Record<string, number>;
  getTeamKey: (phase: string, alignment: string, position: string, lead: string) => string;
  isUnitOwned: (gameId: string | undefined) => boolean;
  meetsRelicReq: (gameId: string | undefined) => boolean;
  isMobile: boolean;
  initialIndex: number | null;
}

/** Build the verified (non-community) accordion items. */
export function buildVerifiedAccordion(opts: AccordionOptions): AccordionItem[] {
  const verified = opts.data.filter(d => !d.videos?.some(v => v.creator) && !d.creator);

  const sorted = [...verified].sort((a, b) => {
    // Saved teams first
    const aSaved = opts.isSaved(opts.phase, opts.alignment, opts.position, a.lead) ? 0 : 1;
    const bSaved = opts.isSaved(opts.phase, opts.alignment, opts.position, b.lead) ? 0 : 1;
    if (aSaved !== bSaved) return aSaved - bSaved;

    // Vote-based sort
    const aKey = opts.getTeamKey(opts.phase, opts.alignment, opts.position, a.lead);
    const bKey = opts.getTeamKey(opts.phase, opts.alignment, opts.position, b.lead);
    const aVotes = opts.voteCounts[aKey] ?? 0;
    const bVotes = opts.voteCounts[bKey] ?? 0;
    const aHas = Math.abs(aVotes) >= 50;
    const bHas = Math.abs(bVotes) >= 50;
    if (aHas || bHas) {
      if (aHas && !bHas) return -1;
      if (!aHas && bHas) return 1;
      return bVotes - aVotes;
    }

    // Ownership
    const aOwned = opts.isUnitOwned(a.gameId) ? 0 : 1;
    const bOwned = opts.isUnitOwned(b.gameId) ? 0 : 1;
    if (aOwned !== bOwned) return aOwned - bOwned;

    // Success rate
    const aSR = successRateValue(a.successRate);
    const bSR = successRateValue(b.successRate);
    if (aSR !== bSR) return aSR - bSR;

    // Interaction complexity
    const aIC = interactionComplexity(a.interactionType);
    const bIC = interactionComplexity(b.interactionType);
    if (aIC !== bIC) return aIC - bIC;

    return a.difficulty - b.difficulty;
  });

  return sorted.map((d, index) => ({
    label: !opts.isMobile && d.leadFull ? d.leadFull : d.lead,
    content: {
      others: d.others,
      notes: d.notes,
      videos: d.videos,
      difficulty: d.difficulty,
      omi: d.omi,
      targeted: d.targeted,
      successRate: d.successRate,
      interactionType: d.interactionType,
      icon: d.icon,
      lead: d.lead,
      gameId: d.gameId,
      owned: opts.isUnitOwned(d.gameId),
      meetsRelic: opts.meetsRelicReq(d.gameId),
    },
    defaultOpen: opts.initialIndex !== null ? opts.initialIndex === index : index === 0,
  }));
}

/** Build the community-suggestion accordion items. */
export function buildCommunityAccordion(opts: AccordionOptions): AccordionItem[] {
  const community = opts.data.filter(d => d.videos?.some(v => v.creator) || d.creator);

  const sorted = [...community].sort((a, b) => {
    const aKey = opts.getTeamKey(opts.phase, opts.alignment, opts.position, a.lead);
    const bKey = opts.getTeamKey(opts.phase, opts.alignment, opts.position, b.lead);
    const aVotes = opts.voteCounts[aKey] ?? 0;
    const bVotes = opts.voteCounts[bKey] ?? 0;

    const aOwned = opts.isUnitOwned(a.gameId) ? 0 : 1;
    const bOwned = opts.isUnitOwned(b.gameId) ? 0 : 1;
    if (aOwned !== bOwned) return aOwned - bOwned;

    return bVotes - aVotes;
  });

  return sorted.map(d => ({
    label: !opts.isMobile && d.leadFull ? d.leadFull : d.lead,
    content: {
      others: d.others,
      notes: d.notes,
      videos: d.videos,
      difficulty: d.difficulty,
      omi: d.omi,
      targeted: d.targeted,
      successRate: d.successRate,
      interactionType: d.interactionType,
      icon: d.icon,
      creator: d.creator,
      lead: d.lead,
      gameId: d.gameId,
      owned: opts.isUnitOwned(d.gameId),
      meetsRelic: opts.meetsRelicReq(d.gameId),
    },
    defaultOpen: false,
  }));
}
