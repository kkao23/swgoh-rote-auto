import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const lsGenericP5: dataType[] = [
    {
        lead: 'Boss Nass',
        others: 'Gungans, Tarpal Omi',
        notes: 'Auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=5kjc-83PM2s', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
        {
        lead: 'Ahsoka Tano',
        others: 'Ezra, random R9',
        notes: '1/2 on auto, prob need more Spectres',
        videos: [{ url: 'https://youtu.be/xruQGASpTP4' }],
        difficulty: difficulty.HARD
    }
]

