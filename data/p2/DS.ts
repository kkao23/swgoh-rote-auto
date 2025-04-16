import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const acklayDSP2: dataType[] = [
    {
        lead: 'Lord Vader',
        others: 'Wat, any 3 empire',
        notes: 'Health/Prot tech on LV, hit auto',
        videos: [{ url: 'https://youtu.be/IfeFkchU5fA' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/EYvM-YOI6Zk' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'bless morgan, easy auto',
        videos: [{ url: 'https://youtu.be/EssSASzT2qo' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'SLKR',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'KRU, Hux, FOO, Sith Trooper',
        notes: 'auto, use D Rey if you have her',
        videos: [{ url: 'https://www.youtube.com/watch?v=vvGaQA5SWYQ&ab_channel=Egnards', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Jango, Zam',
        notes: 'omi Marrok, auto, last two any Mercenaries',
        videos: [{ url: 'https://youtu.be/oiaA3D00Efw' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'GG (Wat)',
        leadFull: 'General Grievous with Wat',
        notes: 'auto, got a bit dicey at the end',
        videos: [{url: 'https://youtu.be/qpJxPdNjDes'}],
        difficulty: difficulty.CAUTION,
        others: 'Magnaguard, STAP, B2, Wat'
    },
    {
        lead: 'Bane',
        others: 'Sith Empire Trooper + Any 3 sith',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/ufHTEnyIUG8'}],
        difficulty: difficulty.EASY
    },
]

export const reekDSP2: dataType[] = [
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Darth Vader, Bane, Malak, any 5th',
        notes: 'auto, Vader and malak are nice, others dont matter',
        videos: [{ url: 'https://youtu.be/ZSa1T0vsPYE' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/H4r1Qyq-cr0' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SLKR',
        others: 'D Rey, KRU, +2 First Order',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Ynmm55msvFo' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Reva',
        others: 'GI, 5B, 7S, 8B',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=c6IZXe1YtHc', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Lord Vader',
        others: 'Mara Jade, Ninth Sister, Piett, Thrawn',
        notes: 'auto, I imagine the others can be whoever empire',
        videos: [{ url: 'https://www.youtube.com/watch?v=Qz5O-GoAKkk', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Dr Aphra',
        others: 'BT1, Darth Vader, HK47, General Grievous',
        notes: 'auto, 0-0-0 if you have him',
        videos: [{ url: 'https://youtu.be/Dspj8Z4Q2bA'}],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Bane',
        others: 'Any 4 sith',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/iUuBF8TLBhw'}],
        difficulty: difficulty.EASY
    },
    {
        lead: 'General Grievous',
        others: 'B2, STAP, Magna, Nute',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/Sr96cRiT6r8'}],
        difficulty: difficulty.EASY
    }
]

export const nexuDSP2: dataType[] = [
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: '2nd special, Auto',
        videos: [{ url: 'https://youtu.be/x3lQbmRbC0U' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SLKR',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'Hux, KRU, Sith Trooper, D Rey',
        notes: 'Poke, auto, DRey makes it easier',
        videos: [{ url: 'https://youtu.be/FW60H6-v6wM' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'LV',
        leadFull: 'Lord Vader',
        others: 'Darth Vader, +3 Empire',
        notes: 'I had Piett Tarkin Thrawn',
        videos: [{ url: 'https://youtu.be/x19YcfeL9_4' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Wat, Bane, Malak, Darth Revan',
        notes: 'only 1/2. Use him elsewhere if you can',
        videos: [{ url: 'https://youtu.be/ysRNg9QnwAg' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'bless morgan, auto',
        videos: [{ url: 'https://youtu.be/HjoqwXNWFNw' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Aurra, Zam',
        notes: 'omi Marrok, auto, last two any Mercenaries',
        videos: [{ url: 'https://youtu.be/FoCgJ_A0FNc' }],
        difficulty: difficulty.EASY,
        omi: true
    },
]

export const shipsDSP2: dataType[] = [
    {
        lead: 'Executrix',
        others: 'MK6 Interceptor, Vader, Scythe, Defender, Interceptor, Sith Fighter, Tie Fighter',
        notes: 'this is super hard, watch the video',
        videos: [{ url: 'https://www.youtube.com/watch?v=4uXzIQqyh1A', creator: creators.kahzgul }],
        difficulty: difficulty.NO_AUTO
    },
]