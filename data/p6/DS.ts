import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const dsGenericP6: dataType[] = [
    {
        lead: 'SLKR',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'KRU, Dark Rey, +2',
        notes: 'video is on manual, not sure if autoable',
        videos: [{ url: 'https://youtu.be/hfhl-xrh0KM?si=6-x4v7fCowHuLvKU', creator: 'Därth Nebula' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.MANUAL],
    },
]

export const darthVaderP6: dataType[] = [
    {
        lead: 'Darth Vader',
        leadFull: 'Darth Vader',
        others: 'None allowed',
        notes: 'video is on manual, looks like only 1/2 is possible',
        videos: [{ url: 'https://youtu.be/W-2HoooGXlM?si=PXMqIXK9AH4wBmgD', creator: 'HanZmaN' }],
        icon: '/icons/characters/tex.charui_vader.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.MANUAL],
        targeted: true,
    },
]

export const idenP6: dataType[] = [
    {
        lead: 'Iden Versio',
        leadFull: 'Iden Versio',
        others: 'SLKR, Nightsister Zombie, Night Trooper, Death Trooper Peridia',
        notes: 'video is on manual, not sure if autoable',
        videos: [{ url: 'https://youtu.be/hl4pylqJRh4?si=11tf-di2MbMv4L9j', creator: 'HanZmaN' }],
        icon: '/icons/characters/tex.charui_idenversioempire.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.PAUSE_WAVE2],
    },
]

export const shipsDSP6: dataType[] = [
    {
        lead: 'Executrix',
        others: 'Tie Fighter, Tie Advanced, Emperor\'s Shuttle, Scythe, Tie Interceptor, Tie Defender, Tie Bomber',
        notes: 'video is on manual, not sure if autoable',
        videos: [{ url: 'https://youtu.be/kxnlNYlNV_Y?si=Deeqabfh2O1ACr8T', creator: 'João Adão' }],
        icon: '/icons/ships/tex.charui_stardestroyer.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL],
        targeted: true
    },
    {
        lead: 'Executrix',
        others: 'Tie Fighter, Tie Advanced, Scythe, Emperor\'s Shuttle,Tie Interceptor, Tie Defender, Tie Bomber',
        notes: 'video is on manual, not sure if autoable',
        videos: [{ url: 'https://youtu.be/vD921nUnCAM?si=LOhGkXcKblXuLqjC', creator: 'Därth Nebula' }],
        icon: '/icons/ships/tex.charui_stardestroyer.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL],
        targeted: true
    },
]