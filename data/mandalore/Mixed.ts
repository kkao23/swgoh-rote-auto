import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const mandaloreFleets: dataType[] = [
    {
        lead: 'Chimera',
        others: 'Scythe, Tie Adv start, Tie interceptor, Tie Defender, Tie Fighter, Emp Shuttle',
        notes: 'not auto for the first moves',
        videos: [{ url: 'https://youtu.be/5dZTKfblLvM' }],
        difficulty: difficulty.NO_AUTO
    },
    {
        lead: 'Leviathan',
        others: 'Gauntlet (mandatory), Bomber, FCI, Assassin, Dorito, MK6 Interceptor, Scimitar',
        notes: 'semi auto, isolate anakin, hold the instakill for Marauder',
        videos: [{ url: 'https://youtu.be/-Xqd1DYrdUA' }],
        difficulty: difficulty.CAUTION
    }
]

export const mandaloreGeneric: dataType[] = [
    {
        lead: 'Boss Nass',
        others: 'The other gungans',
        notes: 'easy auto with Tarpal Omi',
        videos: [{ url: 'https://youtu.be/fLPilo3n-gw' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Reva',
        others: 'GI, 7S, 5B, Marrok',
        notes: 'Marrok Omi, easy auto',
        videos: [{ url: 'https://youtu.be/ke-l_Xxu0p4' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Baylan',
        others: 'Marrok (o), Shin, Han, Boba',
        notes: '1/2 if Marrok gets popped, use Merc instead of Boba if possible',
        videos: [{ url: 'https://youtu.be/h8_04P6rr8Q' }],
        difficulty: difficulty.HARD,
        omi: true
    },
    {
        lead: 'Leia',
        others: 'R2, Drogan, +2 Rebels',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/5VAQS5EqLGE' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'MQJ, POW, Padme, GMY',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/inP-FwCeOn0' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, GK, Padme',
        notes: '1/2 on auto',
        videos: [{ url: 'https://youtu.be/oMmbs2FA16Y' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Ezra Exile, +3',
        notes: 'auto, use spectre if possible, ezra required',
        videos: [{ url: 'https://youtu.be/G8X9wesq-xg' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Finn (omi)',
        others: 'RH Finn, Rose, Zorii, Poe',
        notes: 'auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=3OXMLd1e7PI', creator: creators.pico }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
]

export const mandaloreDTMG: dataType[] = [
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Moff Gideon, Death Trooper, Captain Enoch (omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/NR8m5BfsnSs?si=VuJv_SnHvQIKPFd2&t=87', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    }
]