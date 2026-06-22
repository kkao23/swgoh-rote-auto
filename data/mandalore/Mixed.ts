import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const mandaloreFleets: dataType[] = [
    {
        lead: 'Chimera', gameId: 'CAPITALCHIMAERA',
        others: 'Scythe, Tie Adv start, Tie interceptor, Tie Defender, Tie Fighter, Emp Shuttle',
        notes: 'not auto for the first moves',
        videos: [{ url: 'https://youtu.be/5dZTKfblLvM' }],
        icon: '/icons/ships/tex.charui_chimaera.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL]
    },
    {
        lead: 'Profundity', gameId: 'CAPITALPROFUNDITY',
        others: 'MF, Outrider start, Phantom, Biggs, Wedge Reinf',
        notes: 'cant auto but easy win',
        videos: [{ url: 'https://youtu.be/VcXsUBHgbUs' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.MANUAL]
    },
    {
        lead: 'Leviathan (full auto)', gameId: 'CAPITALLEVIATHAN',
        others: 'Gauntlet (mandatory), Bomber, FCI, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'easy after Levi buffs',
        videos: [{ url: 'https://youtu.be/kyCQ6JXDJvM' }],
        icon: '/icons/ships/tex.charui_leviathan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Executrix', gameId: 'CAPITALSTARDESTROYER',
        others: 'Scythe, Tie Adv start, Tie interceptor, Tie Defender, Tie Fighter/Bomber, Emp Shuttle',
        notes: 'no auto until Anakin and Marauder are down, go after Anakin first and bring out Defender first then go after Marauder',
        videos: [{ url: 'https://youtu.be/RKTzZS5tjR8' }],
        icon: '/icons/ships/tex.charui_stardestroyer.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.MANUAL]
    },
]

export const mandaloreGeneric: dataType[] = [
    {
        lead: 'Boss Nass', gameId: 'BOSSNASS',
        others: 'The other gungans',
        notes: 'usually 1/2 without platoons, 2/2 with',
        videos: [{ url: 'https://youtu.be/fLPilo3n-gw' }],
        icon: '/icons/characters/tex.charui_bossnass.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Lord Vader', gameId: 'LORDVADER',
        others: 'Appo, CX2, Scorch, DCT',
        notes: 'nil Omicron on Appo, full auto, did select Gideon phase 2 to be sure. I have recorded the battle as evidence',
        videos: [],
        icon: '/icons/characters/tex.charui_lordvader.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        creator: 'aFERALPLATYPUS',
    },
    {
        lead: 'Reva', gameId: 'THIRDSISTER',
        others: 'GI, 7S, 5B, Marrok',
        notes: 'Marrok Omi, easy auto',
        videos: [{ url: 'https://youtu.be/ke-l_Xxu0p4' }],
        icon: '/icons/characters/tex.charui_thirdsister.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Baylan', gameId: 'BAYLANSKOLL',
        others: 'Marrok (o), Shin, L3, Qira',
        notes: 'L3s pretaunt is good here. Pause auto to target Moff Gideon in wave 2.',
        videos: [{ url: 'https://youtu.be/rF6NV7kLMpA' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
        targeted: true
    },
    {
        lead: 'Leia', gameId: 'GLLEIA',
        others: 'R2, Drogan, +2 Rebels',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/5VAQS5EqLGE' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'QA', gameId: 'QUEENAMIDALA',
        leadFull: 'Queen Amidala',
        others: 'MQJ, POW, Padme, GMY',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/inP-FwCeOn0' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK', gameId: 'JEDIMASTERKENOBI',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, GK, Padme',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/oMmbs2FA16Y' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano', gameId: 'AHSOKATANO',
        others: 'Ezra Exile, +3',
        notes: 'auto, use spectre if possible, ezra required',
        videos: [{ url: 'https://youtu.be/G8X9wesq-xg' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Finn (omi)', gameId: 'FINN',
        others: 'RH Finn, Rose, Zorii, Poe',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=3OXMLd1e7PI', creator: 'pico' }],
        icon: '/icons/characters/tex.charui_finn.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Omega', gameId: 'OMEGAS3',
        others: 'Bad Batch Mercenaries',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/oXkwJiE_EGg' }, { url: 'https://youtu.be/JuEnsbbFuT4?si=W7cLID0-I95kNy8h', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
    },
    {
        lead: 'JMK (Ezra)', gameId: 'JEDIMASTERKENOBI',
        leadFull: 'Jedi Master Kenobi with Ezra Exile',
        others: 'Padme, CAT, Ezra Exile, GK',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/UaOt-HO-smQ' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Pirate King Hondo', gameId: 'GLHONDO',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Vane, SM-33, Silvo, Brutus',
        notes: 'auto, target Moff Gideon wave 2 to make things a bit faster',
        videos: [{ url: 'https://youtu.be/iXiC7WhOI8U' }],
        icon: '/icons/characters/tex.charui_glhondo.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.PAUSE_WAVE2],
        targeted: true
    },
    {
        lead: 'SEE', gameId: 'SITHPALPATINE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malgus, Dooku, Bane, +1',
        notes: 'auto, Only 1/2',
        videos: [{ url: 'https://youtu.be/4ptGfbJBAvw' }],
        icon: '/icons/characters/tex.charui_espalpatine_pre.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMMW', gameId: 'JEDIMASTERMACEWINDU',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Jocasta Nu, Kelleran Beq, Depa Billaba (omicron), Temple Guard',
        notes: 'auto with all platoons',
        videos: [{ url: 'https://youtu.be/X8s6QTd1LMY' }],
        icon: '/icons/characters/tex.charui_jedimastermacewindu.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        "lead": "Maz Kanata", "gameId": "MAZKANATA",
        "leadFull": "Maz Kanata",
        "others": "Quiggold (Omicron), SM33, Ithano, Kix",
        "notes": "Auto",
        "videos": [],
        "icon": "/icons/characters/tex.charui_mazkanata.png",
        "difficulty": difficulty.EASY,
        "omi": true,
        "successRate": successRate.USUALLY,
        "interactionType": [interactionType.AUTO],
        "creator": "anonymous"
    },
    {
        "lead": "Stranger", "gameId": "STRANGER",
        "leadFull": "Stranger",
        "others": "Hate Fuelled Maul, Starkiller, GK, Cal Kestis",
        "notes": "Testing but pretty sure it’s full auto",
        "videos": [],
        "icon": "/icons/characters/tex.charui_stranger.png",
        "difficulty": difficulty.EASY,
        "successRate": successRate.USUALLY,
        "interactionType": [interactionType.AUTO],
        "creator": "anonymous"
    }
    ,
    {
        lead: 'Satele Shan', gameId: 'SATELESHAN',
        others: 'Jedi Knight Revan, Bastila Shan, Jolee Bindo, Juhani',
        notes: 'Dependind on mods, full auto',
        videos: [],
        icon: '/icons/characters/tex.charui_sateleshan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'Andriu'
    },
    {
        lead: 'Emp Palpatine (DVDE)', gameId: 'EMPERORPALPATINE, VADERDUELSEND',
        leadFull: 'Emperor Palpatine',
        others: 'Emperor Palpatine, Darth Vader Duel\'s End, Admiral Piett, Gar Saxon, Imperial Super Commando',
        notes: 'auto, platoons likely required, may be some luck involved',
        videos: [{ url: 'https://youtu.be/hV0tpUjM1uE' }],
        icon: '/icons/characters/tex.charui_palpatineemperor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },

{
    lead: 'Ahsoka Tano (full spectre)', gameId: 'AHSOKATANO',
    others: 'Full spectre',
    notes: 'Easy',
    videos: [],
    icon: '/icons/characters/tex.charui_ahsokatanogray.png',
    difficulty: difficulty.EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
,
{
    lead: 'Bo-Katan (Mand\'alor)',
    others: 'Paz Vizsla, Mandalorian (Beskar Armor), IG-12 & Grogu, Bo-Katan',
    notes: 'This mission is missed on the webpage so far',
    videos: [],
    icon: '/icons/characters/tex.charui_mandalorbokatan.png',
    difficulty: difficulty.EASY,
    successRate: successRate.CONSISTENT,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
]

export const mandaloreDTMG: dataType[] = [
    {
        lead: 'DTMG', gameId: 'MOFFGIDEONS3',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Night Trooper, Death Trooper Peridea, Captain Enoch (omi)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/SLiK2dv_sSw' }],
        icon: '/icons/characters/tex.charui_moffgideons3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    }
,
{
    lead: 'DTMG (Lord Vader)', gameId: 'MOFFGIDEONS3',
    others: 'LV, Baylan, Reva, Marrok (omi)',
    notes: 'Very expensive. Can 2/2, sometimes only 1/2',
    videos: [],
    icon: '/icons/characters/tex.charui_lordvader.png',
    difficulty: difficulty.EASY,
    successRate: successRate.UNRELIABLE,
    interactionType: [interactionType.AUTO],
    creator: 'anonymous'
}
]
