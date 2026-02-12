import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const topWampaP6: dataType[] = [
        {
        lead: 'Ahsoka Tano',
        others: 'Ezra Exile, Padawan Sabine, Huyang (omicron), Hera',
        notes: 'Video is on manual, not sure if it can be auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=hnQlKZ51oko&t=6s', creator: 'Mar Trepodi' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.MANUAL],
        creator: 'Mar Trepodi',
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans, Tarpal Omi',
        notes: 'Auto, all platoons filled',
        videos: [{ url: 'https://youtu.be/OXOahw1Dv3Q?si=FmhxosmwDx0DaS4F', creator: 'Boston B' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        icon: '/icons/characters/tex.charui_bossnass.png',
        creator: 'Boston B',
    },
]

export const bottomLeftMixedP6: dataType[] = [
        {
        lead: 'The Stranger',
        others: 'Jedi Knight Revan, Malicos, Ninth Sister, Fulcrum',
        notes: 'Video is on manual, not sure if it can be auto',
        videos: [{ url: 'https://youtu.be/GLK2wslmJHc?si=AhV2AO9xQA3nbYkz', creator: 'Mar Trepodi' }],
        icon: '/icons/characters/tex.charui_stranger.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.MANUAL],
        creator: 'Mar Trepodi',
    }
]


export const mixedFleetP6: dataType[] = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'video is on auto, supposedly this one is really easy and can be autoed though',
        videos: [{ url: 'https://youtu.be/N39_wP8TWm8?si=TEJGtNq7OhFqXSOG', creator: 'Mar Trepodi' }],
        icon: '/icons/ships/tex.charui_leviathan.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        creator: 'Mar Trepodi',
    },
]

export const jabbaP6: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boushh, Krrsantan, Skiff Lando, Embo',
        notes: 'video is on manual, not sure if it can be autoed',
        videos: [{ url: 'https://youtu.be/BWUClSbN2vg?si=NO-kXu5aafj5gtOp', creator: 'Mar Trepodi' }],
        icon: '/icons/characters/tex.charui_jabbathehutt.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        creator: 'Mar Trepodi',
    },
]