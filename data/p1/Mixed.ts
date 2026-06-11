import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const qiraMixedP1: dataType[] = [
    {
        lead: 'Qira (Leia)', gameId: 'QIRA',
        others: 'Leia, R2, Drogan',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/iViRHC81yvs' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (JMK)', gameId: 'QIRA',
        others: 'JMK, CAT, GK',
        notes: 'auto, got a bit dicey at the end',
        videos: [{ url: 'https://youtu.be/uYhZJ3qbU9c' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (Baylan)', gameId: 'QIRA',
        others: 'Baylan, Marrok (o), Shin',
        notes: 'auto, hope they dont focus Marrok',
        videos: [{ url: 'https://youtu.be/srzybGeCGjw' }],
        icon: '/icons/characters/tex.charui_baylanskoll.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Qira (Rey/CAT)', gameId: 'QIRA',
        others: 'Rey, CAT, Ben Solo',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/gRYjQVOTQR0' }],
        icon: '/icons/characters/tex.charui_rey_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (Rey no CAT)', gameId: 'QIRA',
        others: 'Rey, L3, Hondo',
        notes: 'lifeblood L3, auto, this got scary, I would sub out Hondo',
        videos: [{ url: 'https://youtu.be/Vj9WEoCV4Io' }],
        icon: '/icons/characters/tex.charui_rey_tros.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (Ahsoka Tano)', gameId: 'QIRA',
        others: 'Ahsoka Tano, Padawan Sabine, Ezra Exile',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/_9kN1TSqgB0' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        "lead": "Qira (Rey/CAT/Dash)", "gameId": "QIRA",
        "leadFull": "Qira with Rey, CAT, and Dash",
        "others": "Rey, Cat, Dash",
        "notes": "auto",
        "videos": [],
        "icon": "/icons/characters/tex.charui_rey_tros.png",
        "difficulty": difficulty.EASY,
        "successRate": successRate.USUALLY,
        "interactionType": [interactionType.AUTO],
        "creator": "anonymous"
    }
]

export const mixedP1: dataType[] = [
    {
        lead: 'CLS', gameId: 'COMMANDERLUKESKYWALKER',
        leadFull: 'Commander Luke Skywalker',
        others: 'Han, Chewie, 3PO, Chewpio',
        notes: 'auto, may need to target damage dealers',
        videos: [{ url: 'https://youtu.be/CxIRs8XsEVA' },],
        icon: '/icons/characters/tex.charui_lukebespin.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'GAS', gameId: 'GENERALSKYWALKER',
        leadFull: 'General Anakin Skywalker',
        others: 'Fives, Rex, Echo, Capt Rex',
        notes: 'auto, need Capt Rex',
        videos: [{ url: 'https://youtu.be/HQBzpbVvYD0' }],
        icon: '/icons/characters/tex.charui_generalanakin.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'E Palaptine (Starkiller)', gameId: 'EMPERORPALPATINE, STARKILLER',
        leadFull: 'Emperor Palpatine (Starkiller)',
        others: 'Starkiller, Mara Jade, Old Ben, Visas',
        notes: 'auto, last two can be any jedi/LS UFU',
        videos: [{ url: 'https://www.youtube.com/watch?v=wyyfYpCldN4', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_palpatineemperor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Hera (Phoenix)', gameId: 'HERASYNDULLAS3',
        others: 'Capt Rex, Kanan, Sabine, Chopper',
        notes: 'I cant get this to work on auto. May require excellent mods',
        videos: [{ url: 'https://www.youtube.com/watch?v=lAw9OrvQzfU', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_hera_s3.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Mother Talzin', gameId: 'MOTHERTALZIN',
        others: 'Merrin, Asajj, Daka, Zombie',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/UBKK051GcTc' }],
        icon: '/icons/characters/tex.charui_nightsisters_talzin.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Finn (omi)', gameId: 'FINN',
        others: 'Rose, Poe, RH Finn, Zorii',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/9ZoFbJLgMeQ?si=OsvnQRT7eJTYF4EQ&t=264', creator: 'pico' }],
        icon: '/icons/characters/tex.charui_finn.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'BK Mandalore', gameId: 'MANDALORBOKATAN',
        leadFull: 'Bo Katan Mandalore',
        others: 'Paz, Beskar Mando, IG12/Grogu, Regular Bo Katan',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/DEytmo8fFC0' }],
        icon: '/icons/characters/tex.charui_mandalorbokatan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Queen Amidala', gameId: 'QUEENAMIDALA',
        others: 'POW, MQJ, Echo, Tech',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/grMuCEYKaF0' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Darth Revan', gameId: 'DARTHREVAN',
        others: 'Malak, BSF, Malgus, Marauder',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/2nFRrzceFOY' }],
        icon: '/icons/characters/tex.charui_sithrevan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Bossk', gameId: 'BOSSK',
        others: 'Fennec, Mando, Boba, Greef',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/6U5e-eqXBvQ' }],
        icon: '/icons/characters/tex.charui_bossk.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega', gameId: 'OMEGAS3',
        others: 'other Bad Batch Mercenaries',
        notes: 'omi wrecker, easy full auto',
        videos: [{ url: 'https://youtu.be/GNwcFQnw-xo' }],
        icon: '/icons/characters/tex.charui_omegas3.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'GAS with QA', gameId: 'GENERALSKYWALKER, QUEENAMIDALA',
        leadFull: 'General Anakin Skywalker with Queen Amidala',
        others: 'Rex, Fives, Echo',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/0bAtF2hqBIs' }],
        icon: '/icons/characters/tex.charui_generalanakin.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Tarkin', gameId: 'GRANDMOFFTARKIN',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo, CX, Disguised Clone Trooper, Scorch',
        notes: 'Easy auto',
        videos: [{ url: 'https://youtu.be/D9qgUFzecK0', }],
        icon: '/icons/characters/tex.charui_tarkinadmiral.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Rey', gameId: 'GLREY',
        others: 'JTR, BB8, Han, Chewbacca',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/9emVf4bmMKM' }],
        icon: '/icons/characters/tex.charui_rey_tlj.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Stormtrooper Luke', gameId: 'STORMTROOPERLUKE',
        others: 'Princess Leia, Stormtrooper Han, C3PO, Chewpio',
        notes: 'auto, was a bit dicey',
        videos: [{ url: 'https://youtu.be/4ZL8_o5s-RQ' }],
        icon: '/icons/characters/tex.charui_luke_ep4.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        "lead": "Carth Onasi", "gameId": "CARTHONASI",
        "leadFull": "Carth Onasi",
        "others": "Zaalbar, Mission, Canderous, and 5OR-T",
        "notes": "Omicron on Carth required, full auto, fast and easy. Actually works easily on every Mixed Phase up to P4 on full auto. After that (P5, P6, and Mandalore) the team still works, just have to go manual usually. No remodding required. Garbage mods work just fine.",
        "videos": [],
        "icon": "/icons/characters/tex.charui_carth.png",
        "difficulty": difficulty.EASY,
        "omi": true,
        "successRate": successRate.USUALLY,
        "interactionType": [interactionType.AUTO],
        "creator": "DyloBin"
    },
    {
        "lead": "Boss Nass", "gameId": "BOSSNASS",
        "leadFull": "Boss Nass",
        "others": "Team of Gungans",
        "notes": "Auto",
        "videos": [],
        "icon": "/icons/characters/tex.charui_bossnass.png",
        "difficulty": difficulty.EASY,
        "successRate": successRate.USUALLY,
        "interactionType": [interactionType.AUTO],
        "creator": "BailWritte"
    },
    {
        lead: 'Boba Fett Scion of Jango', gameId: 'BOBAFETTSCION',
        leadFull: 'Boba Fett Scion of Jango',
        others: 'Asajj Dark Disciple, 4 LOM, Greef, Mando',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/mRXvmmCyBnU' },],
        icon: '/icons/characters/tex.charui_bobafettold.png',
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO],
    },

    {
        lead: 'Maul', gameId: 'MAULS7',
        others: 'Jango, Cordo, Gar Saxon, super commando.',
        notes: 'Easy auto.',
        videos: [],
        icon: '/icons/characters/tex.charui_maul.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'anonymous'
    },
    {
        lead: 'Palpatine', gameId: 'EMPERORPALPATINE',
        others: 'MJ, Starkiller, Old Ben, Cal Kestis',
        notes: 'Once MJ gets her turn and Palpatine shocks, everyone basically stays stunned for the remainder',
        videos: [],
        icon: '/icons/characters/tex.charui_palpatineemperor.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        creator: 'anonymous'
    },
]

export const jabbaP1: dataType[] = [
    {
        lead: 'Jabba', gameId: 'JABBATHEHUTT',
        others: 'Boba, Krrsantan, Skiff Lando, Booush',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/W_GayJRsWy4' }],
        icon: '/icons/characters/tex.charui_jabbathehutt.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }
]

export const drAphraP1: dataType[] = [
    {
        lead: 'Aphra (IG-90)', gameId: 'DOCTORAPHRA',
        others: 'BT1, 000, HK-47, IG-90',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/cxpLm8I_TJQ' }],
        icon: '/icons/characters/tex.charui_doctoraphra.png',
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Aphra (Rey)', gameId: 'DOCTORAPHRA',
        others: 'Rey, JTR, Ben, BB8',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/dNNTaMIUjD8' }],
        icon: '/icons/characters/tex.charui_rey_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Aphra (Droids)', gameId: 'DOCTORAPHRA',
        others: 'BT1, 000, Darth Vader, IG-88',
        notes: 'auto, can get unlucky if they focus down aphra, can sub IG-88 for Krr or another DS droid',
        videos: [{ url: 'https://youtu.be/36sojaFa4uA' }],
        icon: '/icons/characters/tex.charui_doctoraphra.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Aphra (SLKR)', gameId: 'DOCTORAPHRA',
        others: 'SLKR, Dark Side Rey, KRU, Sith Trooper',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/H6rzBkYeixY' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Aphra (Ahsoka Tano)', gameId: 'DOCTORAPHRA',
        others: 'Hera, Sabine, Huyang',
        notes: 'auto, dont need ezra here',
        videos: [{ url: 'https://youtu.be/phkCY2ikmtI' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }
]

export const shipsP1: dataType[] = [
    {
        lead: 'Executor', gameId: 'CAPITALEXECUTOR',
        others: 'HT, P1, XB, Slave 1, IG2000',
        notes: 'auto, use RC if not platooned',
        videos: [{ url: 'https://youtu.be/Qzduxv0BJx8' }],
        icon: '/icons/ships/tex.charui_executor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Malevolence', gameId: 'CAPITALMALEVOLENCE',
        others: 'Vulture, Hyena, Spy, Soldier',
        notes: 'auto, do not bring Sun Fac or any other reinforcements. not sure if totally reliable',
        videos: [{ url: 'https://youtu.be/VaQSNWNpfVU' }],
        icon: '/icons/ships/tex.charui_malevolence.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Leviathan', gameId: 'CAPITALLEVIATHAN',
        others: 'FCI, Bomber start, Sith Fighter, MK6 Interceptor, Tie Dorito, Scimitar reinforcements',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/e1MRl_z2q60' }],
        icon: '/icons/ships/tex.charui_leviathan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Profundity', gameId: 'CAPITALPROFUNDITY',
        others: 'HMF, Y wing, Phantom, Ghost, Biggs, Wedge',
        notes: 'auto, dont use Outrider here',
        videos: [{ url: 'https://youtu.be/bU0KRWRabAE' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Raddus', gameId: 'CAPITALRADDUS',
        others: 'Rey MF, Lando MF, Res Bomber, Comeuppance, Poes Xwing, Res Xwing, Ebon Hawk',
        notes: 'cant auto. ',
        videos: [{ url: 'https://youtu.be/d9fdaQRbVkQ' }],
        icon: '/icons/ships/tex.charui_raddus.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.MANUAL]
    },
    {
        lead: 'Negotiator', gameId: 'CAPITALNEGOTIATOR',
        others: 'Marauder, Y Wing start, JKA, Fives, Ahsoka, Plo reinforcements',
        notes: 'marauder likely mandatory, no auto',
        videos: [{ url: 'https://youtu.be/DDctMUYgHa0' }],
        icon: '/icons/ships/tex.charui_negotiator.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.MANUAL]
    },
]
