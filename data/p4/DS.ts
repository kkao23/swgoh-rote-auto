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

export const dsRightP4: dataType[] = [
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
    }
]

export const dsMidP4:dataType[] = [
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
    }
]