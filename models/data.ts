import { creators } from "./creators"

type videos = {
    url: string,
    creator?: creators,
}

export type data = {
    lead: string,
    leadFull?: string,
    others: string,
    notes: string,
    videos: videos[],
    difficulty: difficulty,
    omi?: boolean,
    targeted?: boolean,
    successRate?: successRate,
    interactionType?: interactionType[],  // Changed to array
    path?: string,
}

export enum difficulty {
    VERY_EASY,
    EASY,
    CAUTION,
    HARD,
    NO_AUTO,
}

export enum successRate {
    CONSISTENT = 'consistent',           // Consistent 2/2, 100%
    NINETY_PERCENT = 'ninety-percent',   // 90% success rate
    USUALLY = 'usually',                 // 60-80% success, can fail
    FIFTY_FIFTY = 'fifty-fifty',         // 1/2 consistent, sometimes 2/2
    UNRELIABLE = 'unreliable',           // Cannot auto or very unreliable
}

export enum interactionType {
    AUTO = 'auto',                       // Pure auto, no interaction
    TARGET_START = 'target-start',       // Target at battle start
    PAUSE_WAVE2 = 'pause-wave2',         // Pause at wave 2
    MANUAL = 'manual',                   // Cannot auto, manual play required
}

export type DataType = {
    [phase: string]: PhaseData;
}

export type PhaseData = {
    [side: string]: SideData;
}

export type SideData = {
    [key: string]: any[];
}
