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
    path?: string,
}

export enum difficulty {
    VERY_EASY,
    EASY,
    CAUTION,
    HARD,
    NO_AUTO,
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