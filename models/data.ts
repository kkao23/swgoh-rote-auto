export type data = {
    lead: string,
    others: string,
    notes: string,
    link: string,
    difficulty: difficulty,
}

export enum difficulty {
    VERY_EASY,
    EASY,
    CAUTION,
    HARD,
    NO_AUTO,
}