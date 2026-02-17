import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const acklayDSP2: dataType[] = [
    {
        lead: 'Lord Vader',
        others: 'Wat, any 3 empire',
        notes: 'Health/Prot tech on LV, hit auto',
        videos: [{ url: 'https://youtu.be/IfeFkchU5fA' }],
        icon: '/icons/characters/tex.charui_lordvader.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/EYvM-YOI6Zk' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'bless morgan, easy auto',
        videos: [{ url: 'https://youtu.be/EssSASzT2qo' }],
        icon: '/icons/characters/tex.charui_greatmothers.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SLKR',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'Dark Rey, whatever other First Order you have',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Nytd6WxJ08A' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Jango, Zam',
        notes: 'omi Marrok, auto, last two any Mercenaries',
        videos: [{ url: 'https://youtu.be/oiaA3D00Efw' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'GG (Wat)',
        leadFull: 'General Grievous with Wat',
        notes: 'auto, got a bit dicey at the end',
        videos: [{url: 'https://youtu.be/qpJxPdNjDes'}],
        icon: '/icons/characters/tex.charui_grievous.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        others: 'Magnaguard, STAP, B2, Wat'
    },
    {
        lead: 'Bane',
        others: 'Sith Empire Trooper + Any 3 sith',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/ufHTEnyIUG8'}],
        icon: '/icons/characters/tex.charui_darthbane.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Night Trooper',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/ORKuex1uEC0'}],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper, Scorch',
        notes: 'Easy auto',
        videos: [{ url: 'https://youtu.be/lsNKXGBDoL0', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
]

export const reekDSP2: dataType[] = [
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Darth Vader, Bane, Malak, any 5th',
        notes: 'auto, Vader and malak are nice, others dont matter',
        videos: [{ url: 'https://youtu.be/ZSa1T0vsPYE' }],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/H4r1Qyq-cr0' }],
        icon: '/icons/characters/tex.charui_greatmothers.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SLKR',
        others: 'D Rey, KRU, +2 First Order',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Ynmm55msvFo' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Reva',
        others: 'GI, 5B, 7S, 8B',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/grC8Q6YjdX4' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        icon: '/icons/characters/tex.charui_thirdsister.png'
    },
    {
        lead: 'Lord Vader',
        others: 'Mara Jade, Ninth Sister, Piett, Thrawn',
        notes: 'auto, I imagine the others can be whoever empire',
        videos: [{ url: 'https://www.youtube.com/watch?v=Qz5O-GoAKkk', creator: 'egnards' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        icon: '/icons/characters/tex.charui_lordvader.png'
    },
    {
        lead: 'Dr Aphra',
        others: 'BT1, Darth Vader, HK47, General Grievous',
        notes: 'auto, 0-0-0 if you have him',
        videos: [{ url: 'https://youtu.be/Dspj8Z4Q2bA'}],
        icon: '/icons/characters/tex.charui_doctoraphra.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Bane',
        others: 'Any 4 sith',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/iUuBF8TLBhw'}],
        icon: '/icons/characters/tex.charui_darthbane.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'General Grievous',
        others: 'B2, STAP, Magna, Nute',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/Sr96cRiT6r8'}],
        icon: '/icons/characters/tex.charui_grievous.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Jango, Zam',
        notes: 'omi Marrok, auto, last two any Mercenaries, hope Marrok doesnt get targeted first turn',
        videos: [{ url: 'https://youtu.be/1QqyIDN0yvA' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true,
        omi: true
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Moff Gideon',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/NHvqhjH4klk'}],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper, Scorch',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/Gi6SPOp4NE8', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
]

export const nexuDSP2: dataType[] = [
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, 8B',
        notes: '2nd special, Auto',
        videos: [{ url: 'https://youtu.be/x3lQbmRbC0U' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SLKR',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'Hux, KRU, Sith Trooper, D Rey',
        notes: 'Poke, auto, DRey makes it easier',
        videos: [{ url: 'https://youtu.be/FW60H6-v6wM' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'LV',
        leadFull: 'Lord Vader',
        others: 'Darth Vader, +3 Empire',
        notes: 'I had Piett Tarkin Thrawn',
        videos: [{ url: 'https://youtu.be/x19YcfeL9_4' }],
        icon: '/icons/characters/tex.charui_lordvader.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Wat, Bane, Malak, Darth Revan',
        notes: 'only 1/2. Use him elsewhere if you can',
        videos: [{ url: 'https://youtu.be/ysRNg9QnwAg' }],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY
    },
    {
        lead: 'Great Mothers',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'bless morgan, auto',
        videos: [{ url: 'https://youtu.be/HjoqwXNWFNw' }],
        icon: '/icons/characters/tex.charui_greatmothers.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Baylan',
        others: 'Marrok, Shin, Aurra, Zam',
        notes: 'omi Marrok, auto, last two any Mercenaries',
        videos: [{ url: 'https://youtu.be/FoCgJ_A0FNc' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper, +1',
        notes: 'I had Thrawn as 5th but Scorch is ideal. Not sure if I got lucky with them targeting Nightfall first',
        videos: [{ url: 'https://youtu.be/fjaJ59NNSmQ', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        targeted: true,
        omi: true
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Moff Gideon',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/9KBjG8jkKFU'}],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'SEE (Super Sith)',
        leadFull: 'Sith Eternal Emperor',
        others: 'Darth Revan, Bane, Malak, the Stranger',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/25LcpIsymsk' }],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
]

export const shipsDSP2: dataType[] = [
    {
        lead: 'Executrix',
        others: 'MK6 Interceptor, Vader, Scythe, Defender, Interceptor, Sith Fighter, Tie Fighter',
        notes: 'this is super hard, watch the video',
        videos: [{ url: 'https://www.youtube.com/watch?v=4uXzIQqyh1A', creator: 'kahzgul' }],
        icon: '/icons/ships/tex.charui_stardestroyer.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE
    },
]