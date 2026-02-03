import { type data as dataType } from "~/models/data";
import { difficulty, successRate, interactionType } from "~/models/data";

export const qiraMixedP1: dataType[] = [
    {
        lead: 'Qira (Leia)',
        others: 'Leia, R2, Drogan',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/iViRHC81yvs' }],
        icon: '/icons/characters/tex.charui_leiaendor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (JMK)',
        others: 'JMK, CAT, GK',
        notes: 'auto, got a bit dicey at the end',
        videos: [{ url: 'https://youtu.be/uYhZJ3qbU9c' }],
        icon: '/icons/characters/tex.charui_globiwan.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (Baylan)',
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
        lead: 'Qira (Rey/CAT)',
        others: 'Rey, CAT, Dash',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/9ZoFbJLgMeQ?si=52LjaRA6F8zWoIIE&t=334', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_rey_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (Rey no CAT)',
        others: 'Rey, L3, Hondo',
        notes: 'lifeblood L3, auto, this got scary, I would sub out Hondo',
        videos: [{url: 'https://youtu.be/Vj9WEoCV4Io'}],
        icon: '/icons/characters/tex.charui_rey_tros.png',
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Qira (Ahsoka Tano)',
        others: 'Ahsoka Tano, Padawan Sabine, Ezra Exile',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/_9kN1TSqgB0' }],
        icon: '/icons/characters/tex.charui_ahsokatanogray.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }
]

export const mixedP1: dataType[] = [
    {
        lead: 'CLS',
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
        lead: 'GAS',
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
        lead: 'E Palaptine (Starkiller)',
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
        lead: 'Hera (Phoenix)',
        others: 'Capt Rex, Kanan, Sabine, Chopper',
        notes: 'I cant get this to work on auto. May require excellent mods',
        videos: [{ url: 'https://www.youtube.com/watch?v=lAw9OrvQzfU', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_hera_s3.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Mother Talzin',
        others: 'Merrin, Asajj, Daka, Zombie',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=BuRRMRfocoo', creator: 'egnards' }],
        icon: '/icons/characters/tex.charui_nightsisters_talzin.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Finn (omi)',
        others: 'Rose, Poe, RH Finn, Zorii',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/9ZoFbJLgMeQ?si=OsvnQRT7eJTYF4EQ&t=264', creator: 'pico'}],
        icon: '/icons/characters/tex.charui_finn.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'BK Mandalore',
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
        lead: 'Queen Amidala',
        others: 'POW, MQJ, Echo, Tech',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/grMuCEYKaF0' }],
        icon: '/icons/characters/tex.charui_queenamidala.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Darth Revan',
        others: 'Malak, BSF, Malgus, Marauder',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/2nFRrzceFOY' }],
        icon: '/icons/characters/tex.charui_sithrevan.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Bossk',
        others: 'Fennec, Mando, Boba, Greef',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/6U5e-eqXBvQ' }],
        icon: '/icons/characters/tex.charui_bossk.png',
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega',
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
        lead: 'GAS with QA',
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
        lead: 'Tarkin',
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
]

export const jabbaP1: dataType[] = [
    {
        lead: 'Jabba',
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
        lead: 'Aphra (Rey)',
        others: 'Rey, JTR, Ben, BB8',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/dNNTaMIUjD8' }],
        icon: '/icons/characters/tex.charui_rey_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Aphra (Droids)',
        others: 'BT1, 000, Darth Vader, IG-88',
        notes: 'auto, can get unlucky if they focus down aphra, can sub IG-88 for Krr or another DS droid',
        videos: [{ url: 'https://youtu.be/36sojaFa4uA' }],
        icon: '/icons/characters/tex.charui_doctoraphra.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Aphra (SLKR)',
        others: 'SLKR, Dark Side Rey, KRU, Sith Trooper',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/H6rzBkYeixY' }],
        icon: '/icons/characters/tex.charui_kyloren_tros.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Aphra (Ahsoka Tano)',
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
        lead: 'Executor',
        others: 'HT, P1, XB, Slave 1, IG2000',
        notes: 'auto, use RC if not platooned',
        videos: [{ url: 'https://youtu.be/Qzduxv0BJx8' }],
        icon: '/icons/ships/tex.charui_executor.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Malevolence',
        others: 'Vulture, Hyena, Spy, Soldier',
        notes: 'auto, do not bring Sun Fac or any other reinforcements. not sure if totally reliable',
        videos: [{url: 'https://youtu.be/VaQSNWNpfVU'}],
        icon: '/icons/ships/tex.charui_malevolence.png',
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber start, Sith Fighter, MK6 Interceptor, Tie Dorito, Scimitar reinforcements',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/e1MRl_z2q60' }],
        icon: '/icons/ships/tex.charui_leviathan.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Profundity',
        others: 'HMF, Y wing, Phantom, Ghost, Biggs, Wedge',
        notes: 'auto, dont use Outrider here',
        videos: [{ url: 'https://youtu.be/bU0KRWRabAE' }],
        icon: '/icons/ships/tex.charui_profundity.png',
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Lando MF, Res Bomber, Comeuppance, Poes Xwing, Res Xwing, Ebon Hawk',
        notes: 'cant auto. ',
        videos: [{ url: 'https://youtu.be/d9fdaQRbVkQ' }],
        icon: '/icons/ships/tex.charui_raddus.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.MANUAL]
    },
    {
        lead: 'Negotiator',
        others: 'Marauder, Y Wing start, JKA, Fives, Ahsoka, Plo reinforcements',
        notes: 'marauder likely mandatory, no auto',
        videos: [{ url: 'https://youtu.be/DDctMUYgHa0' }],
        icon: '/icons/ships/tex.charui_negotiator.png',
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.MANUAL]
    },
]
