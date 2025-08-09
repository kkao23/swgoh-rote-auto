import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";


export const dsInqP4: dataType[] = [
    {
        lead: 'Reva',
        others: 'Marrok, GI, 7S, 5B',
        notes: 'marrok omi, auto',
        videos: [{ url: 'https://youtu.be/2q1SguWa54Y' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    }
]

export const dsMidRightP4: dataType[] = [
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malak, Dooku, DR, Bane',
        notes: 'auto, Only 1/2',
        videos: [{ url: 'https://youtu.be/JZT1-k2EDIo' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Mother Talzin',
        others: 'Asajj, Daka, Zombie, Merrin',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=UX67LlXNtBY', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
        {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Traya, Malgus, Nihilus, Sion',
        notes: 'Pico has R9 on SEE, Traya and Sion. Not sure if this is reliable with R8',
        videos: [{url: 'https://youtu.be/ecgbRYyLYn8?si=vXiCr9uxLr9M5eJi', creator: creators.pico}],
        difficulty: difficulty.EASY,
    },
    {
        lead: 'Reva',
        others: 'Marrok, GI, 7S, 5B',
        notes: 'marrok omi, auto',
        videos: [{ url: 'https://youtu.be/w8sQ1bMYvew' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper',
        notes: 'Scorch makes this easier but Piett works in his place. Need full platoons',
        videos: [{ url: 'https://youtu.be/zYBou5t9kRI', }],
        difficulty: difficulty.EASY,
        omi: true
    },
    {
        lead: 'Baylan',
        leadFull: 'Baylan Skoll',
        others: 'Shin, Marrok, Malak, +1',
        notes: 'Really want an off tank to reduce the chance Marrok gets killed early',
        videos: [{ url: 'https://youtu.be/p6bhOC6tlEo', }],
        difficulty: difficulty.EASY,
        omi: true
    }
]