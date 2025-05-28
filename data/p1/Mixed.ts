import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const qiraMixedP1: dataType[] = [
    {
        lead: 'Qira (Leia)',
        others: 'Leia, R2, Drogan',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/iViRHC81yvs' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Qira (JMK)',
        others: 'JMK, CAT, GK',
        notes: 'auto, got a bit dicey at the end',
        videos: [{ url: 'https://youtu.be/uYhZJ3qbU9c' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Qira (Baylan)',
        others: 'Baylan, Marrok (o), Shin',
        notes: 'auto, hope they dont focus Marrok',
        videos: [{ url: 'https://youtu.be/srzybGeCGjw' }],
        difficulty: difficulty.EASY,
        omi: true
    },
    {
        lead: 'Qira (Rey/CAT)',
        others: 'Rey, CAT, Dash',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/9ZoFbJLgMeQ?si=52LjaRA6F8zWoIIE&t=334', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Qira (Rey no CAT)',
        others: 'Rey, L3, Hondo',
        notes: 'lifeblood L3, auto, this got scary, I would sub out Hondo',
        videos: [{url: 'https://youtu.be/Vj9WEoCV4Io'}],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Qira (Ahsoka Tano)',
        others: 'Ahsoka Tano, Padawan Sabine, Ezra Exile',
        notes: 'auto, takes awhile',
        videos: [{ url: 'https://youtu.be/_9kN1TSqgB0' }],
        difficulty: difficulty.VERY_EASY
    }
]

export const mixedP1: dataType[] = [
    {
        lead: 'CLS',
        leadFull: 'Commander Luke Skywalker',
        others: 'Han, Chewie, 3PO, Chewpio',
        notes: 'auto, may need to target damage dealers',
        videos: [{ url: 'https://youtu.be/CxIRs8XsEVA' },{url: 'https://www.youtube.com/watch?v=bvaEwtoy7W4', creator: creators.egnards }],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'GAS',
        leadFull: 'General Anakin Skywalker',
        others: 'Fives, Rex, Echo, Capt Rex',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/HQBzpbVvYD0' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'E Palaptine (Starkiller)',
        leadFull: 'Emperor Palpatine (Starkiller)',
        others: 'Starkiller, Mara Jade, Old Ben, Visas',
        notes: 'auto, last two can be any jedi/LS UFU',
        videos: [{ url: 'https://www.youtube.com/watch?v=wyyfYpCldN4', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Hera (Phoenix)',
        others: 'Capt Rex, Kanan, Sabine, Chopper',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=lAw9OrvQzfU', creator: creators.egnards }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Mother Talzin',
        others: 'Merrin, Asajj, Daka, Zombie',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=BuRRMRfocoo', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Finn (omi)',
        others: 'Rose, Poe, RH Finn, Zorii',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/9ZoFbJLgMeQ?si=OsvnQRT7eJTYF4EQ&t=264', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'BK Mandalore',
        leadFull: 'Bo Katan Mandalore',
        others: 'Paz, Beskar Mando, IG12/Grogu, Regular Bo Katan',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/DEytmo8fFC0' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Queen Amidala',
        others: 'POW, MQJ, Echo, Tech',
        notes: 'auto, last two can vary',
        videos: [{ url: 'https://youtu.be/grMuCEYKaF0' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Darth Revan',
        others: 'Malak, BSF, Malgus, Marauder',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/2nFRrzceFOY' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Bossk',
        others: 'Fennec, Mando, Boba, Greef',
        notes: 'only 1/2 on auto',
        videos: [{ url: 'https://youtu.be/6U5e-eqXBvQ' }],
        difficulty: difficulty.HARD
    }
]

export const jabbaP1: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boba, Krrsantan, Skiff Lando, Booush',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/W_GayJRsWy4' }],
        difficulty: difficulty.VERY_EASY
    }
]

export const drAphraP1: dataType[] = [
    {
        lead: 'Aphra (Rey)',
        others: 'Rey, JTR, Ben, BB8',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/dNNTaMIUjD8' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Aphra (Droids)',
        others: 'BT1, 000, Darth Vader, IG-88',
        notes: 'auto, can get unlucky if they focus down aphra, can sub IG-88 for Krr or another DS droid',
        videos: [{ url: 'https://youtu.be/36sojaFa4uA' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Aphra (SLKR)',
        others: 'SLKR, Dark Side Rey, KRU, Sith Trooper',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/H6rzBkYeixY' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Aphra (Ahsoka Tano)',
        others: 'Hera, Sabine, Huyang',
        notes: 'auto, dont need ezra here',
        videos: [{ url: 'https://youtu.be/phkCY2ikmtI' }],
        difficulty: difficulty.VERY_EASY
    }
]

export const shipsP1: dataType[] = [
    {
        lead: 'Executor',
        others: 'HT, P1, XB, Slave 1, IG2000',
        notes: 'auto, use RC if not platooned',
        videos: [{ url: 'https://youtu.be/Qzduxv0BJx8' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Malevolence',
        others: 'Vulture, Hyena, Spy, Soldier',
        notes: 'auto, do not bring Sun Fac or any other reinforcements. not sure if totally reliable',
        videos: [{url: 'https://youtu.be/VaQSNWNpfVU'}],
        difficulty: difficulty.EASY,
    },
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber start, Sith Fighter, MK6 Interceptor, Tie Dorito, Scimitar reinforcements',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/e1MRl_z2q60' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Profundity',
        others: 'HMF, Y wing, Phantom, Ghost, Biggs, Wedge',
        notes: 'auto, dont use Outrider here',
        videos: [{ url: 'https://youtu.be/bU0KRWRabAE' }],
        difficulty: difficulty.VERY_EASY
    },
]