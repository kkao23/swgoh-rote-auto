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
}

export enum difficulty {
    VERY_EASY,
    EASY,
    CAUTION,
    HARD,
    NO_AUTO,
}