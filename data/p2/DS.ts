import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const acklayDSP2: dataType[] = [
    {
        lead: 'Lord Vader', gameId: 'LORDVADER',
        others: 'Wat, any 3 empire',
        notes: 'Health/Prot tech on LV, hit auto',
        videos: [{ url: 'https://youtu.be/IfeFkchU5fA' }],
        icon: '/icons/characters/tex.charui_lordvader.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Reva', gameId: 'THIRDSISTER',
        others: 'GI, 7S, 5B, 8B',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/EYvM-YOI6Zk' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Great Mothers', gameId: 'GREATMOTHERS',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'bless morgan, easy auto',
        videos: [{ url: 'https://youtu.be/EssSASzT2qo' }],
        icon: '/icons/characters/tex.charui_greatmothers.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SLKR', gameId: 'SUPREMELEADERKYLOREN',
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
        lead: 'Baylan', gameId: 'BAYLANSKOLL',
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
        lead: 'GG (Wat)', gameId: 'GRIEVOUS',
        leadFull: 'General Grievous with Wat',
        notes: 'auto, got a bit dicey at the end',
        videos: [{ url: 'https://youtu.be/qpJxPdNjDes' }],
        icon: '/icons/characters/tex.charui_grievous.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        others: 'Magnaguard, STAP, B2, Wat'
    },
    {
        lead: 'Bane', gameId: 'DARTHBANE',
        others: 'Sith Empire Trooper + Any 3 sith',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/ufHTEnyIUG8' }],
        icon: '/icons/characters/tex.charui_darthbane.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'DTMG', gameId: 'MOFFGIDEONS3',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Night Trooper',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/ORKuex1uEC0' }],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Tarkin', gameId: 'GRANDMOFFTARKIN',
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
    {
        lead: 'DTMG', gameId: 'MOFFGIDEONS3',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Dark Trooper, Night Trooper, Scout Trooper, Enoch',
        notes: 'No omi, always call Dark Trooper for assist, all my guys R7, only Dark Trooper R8, because of RotE platoon.',
        videos: [],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.MANUAL],
        creator: 'anonymous',
    },

    {
        lead: 'Captain Enoch', gameId: 'CAPTAINENOCH',
        others: 'night trooper, death trooper peridea, any other imperial remnants',
        notes: 'auto',
        videos: [],
        icon: '/icons/characters/tex.charui_captainenoch.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'Darth Speedy'
    }
]

export const reekDSP2: dataType[] = [
    {
        lead: 'SEE', gameId: 'SITHPALPATINE',
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
        lead: 'Great Mothers', gameId: 'GREATMOTHERS',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/H4r1Qyq-cr0' }],
        icon: '/icons/characters/tex.charui_greatmothers.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SLKR', gameId: 'SUPREMELEADERKYLOREN',
        others: 'D Rey, KRU, +2 First Order',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Ynmm55msvFo' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Reva', gameId: 'THIRDSISTER',
        others: 'GI, 5B, 7S, 8B',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/grC8Q6YjdX4' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        icon: '/icons/characters/tex.charui_thirdsister.png'
    },
    {
        lead: 'Lord Vader', gameId: 'LORDVADER',
        others: 'Shoretrooper, Piett, Thrawn',
        notes: 'auto, any empire works',
        videos: [{ url: 'https://youtu.be/1qQIxB3OQPs' }],
        icon: '/icons/characters/tex.charui_lordvader.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Dr Aphra', gameId: 'DOCTORAPHRA',
        others: 'BT1, Darth Vader, HK47, General Grievous',
        notes: 'auto, 0-0-0 if you have him',
        videos: [{ url: 'https://youtu.be/Dspj8Z4Q2bA' }],
        icon: '/icons/characters/tex.charui_doctoraphra.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Bane', gameId: 'DARTHBANE',
        others: 'Any 4 sith',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/iUuBF8TLBhw' }],
        icon: '/icons/characters/tex.charui_darthbane.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'General Grievous', gameId: 'GRIEVOUS',
        others: 'B2, STAP, Magna, Nute',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Sr96cRiT6r8' }],
        icon: '/icons/characters/tex.charui_grievous.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Baylan', gameId: 'BAYLANSKOLL',
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
        lead: 'DTMG', gameId: 'MOFFGIDEONS3',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Moff Gideon',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/NHvqhjH4klk' }],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Tarkin', gameId: 'GRANDMOFFTARKIN',
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
    {
        lead: 'Emp Palpatine (DVDE)', gameId: 'EMPERORPALPATINE, VADERDUELSEND',
        leadFull: 'Emperor Palpatine',
        others: 'Emperor Palpatine, Darth Vader Duel\'s End, Admiral Piett, Gar Saxon, Imperial Super Commando',
        notes: 'Easy fast auto',
        videos: [{ url: 'https://youtu.be/pqPw3rPCRb0' }],
        icon: '/icons/characters/tex.charui_palpatineemperor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },

{
    lead: 'Doctor Aphra (IG90)', gameId: 'DOCTORAPHRA',
    others: 'IG-90, BT-1, 0-0-0 +1',
    notes: 'Super easy. Any 5th works, I usually use Sm33 or Grievous. Probably dont need 000',
    videos: [],
    icon: '/icons/characters/tex.charui_doctoraphra.png',
    difficulty: difficulty.EASY,
    successRate: successRate.USUALLY,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
]

export const nexuDSP2: dataType[] = [
    {
        lead: 'Reva', gameId: 'THIRDSISTER',
        others: 'GI, 7S, 5B, 8B',
        notes: '2nd special, Auto',
        videos: [{ url: 'https://youtu.be/x3lQbmRbC0U' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SLKR', gameId: 'SUPREMELEADERKYLOREN',
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
        lead: 'LV', gameId: 'LORDVADER',
        leadFull: 'Lord Vader',
        others: 'Darth Vader, +3 Empire',
        notes: 'I had Piett Tarkin Thrawn',
        videos: [{ url: 'https://youtu.be/x19YcfeL9_4' }],
        icon: '/icons/characters/tex.charui_lordvader.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT
    },
    {
        lead: 'SEE', gameId: 'SITHPALPATINE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Wat, Bane, Malak, Darth Revan',
        notes: 'only 1/2. Use him elsewhere if you can',
        videos: [{ url: 'https://youtu.be/ysRNg9QnwAg' }],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY
    },
    {
        lead: 'Great Mothers', gameId: 'GREATMOTHERS',
        others: 'Morgan, Merrin, Night Trooper, Death Trooper',
        notes: 'bless morgan, auto',
        videos: [{ url: 'https://youtu.be/HjoqwXNWFNw' }],
        icon: '/icons/characters/tex.charui_greatmothers.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Baylan', gameId: 'BAYLANSKOLL',
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
        lead: 'Tarkin', gameId: 'GRANDMOFFTARKIN',
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
        lead: 'DTMG', gameId: 'MOFFGIDEONS3',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Captain Enoch (omi), Death Trooper, Moff Gideon',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/9KBjG8jkKFU' }],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'SEE (Super Sith)', gameId: 'SITHPALPATINE',
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
        lead: 'Executrix', gameId: 'CAPITALSTARDESTROYER',
        others: 'MK6 Interceptor, Vader, Scythe, Defender, Interceptor, Sith Fighter, Tie Fighter',
        notes: 'this is super hard, watch the video',
        videos: [{ url: 'https://www.youtube.com/watch?v=4uXzIQqyh1A', creator: 'kahzgul' }],
        icon: '/icons/ships/tex.charui_stardestroyer.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE
    },
]