import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const lsShipsP6: dataType[] = [
    {
        lead: 'Profundity', gameId: 'CAPITALPROFUNDITY',
        others: 'MF, Outrider, Y Wing, Phantom, Cassian, Biggs, Bistan',
        notes: 'Video is on manual but looks autoable with Rogue One',
        videos: [{ url: 'https://youtu.be/JcmNmvY4klY?si=TfjlyK7qYDoOSkwJ', creator: 'GoBucsGo' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
]

export const genericLSP6: dataType[] = [

{
    lead: 'JMK', gameId: 'JEDIMASTERKENOBI',
    others: 'CAT, GK, GAS, Snips',
    notes: 'Does not work on auto. Manual play 1/2 possible. The damage every 10 waves will wipe the Team.',
    videos: [],
    difficulty: difficulty.CAUTION,
    successRate: successRate.FIFTY_FIFTY,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
]

export const cassianLSP6: dataType[] = [

{
    lead: 'JKCK (Omi)', gameId: 'JEDIKNIGHTCAL',
    others: 'Okk, Cassian, K2, Pao',
    notes: 'Full auto',
    videos: [],
    difficulty: difficulty.EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
]

export const bazeLSP6: dataType[] = [

{
    lead: 'Gl leia', gameId: 'GLLEIA',
    others: 'Drogan, Srp, Baze, Chirrut',
    notes: 'Full auto',
    videos: [],
    difficulty: difficulty.EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
]