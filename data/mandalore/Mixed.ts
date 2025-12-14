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
        lead: 'Leviathan (guided)',
        others: 'Gauntlet (mandatory), Bomber, FCI, Assassin, Dorito, MK6 Interceptor, Scimitar',
        notes: 'semi auto, isolate anakin, hold the instakill for Marauder',
        videos: [{ url: 'https://youtu.be/-Xqd1DYrdUA' }],
        difficulty: difficulty.CAUTION
    },
        {
        lead: 'Profundity',
        others: 'MF, Outrider start, Phantom, Biggs, Wedge Reinf',
        notes: 'cant auto but easy win',
        videos: [{ url: 'https://youtu.be/VcXsUBHgbUs' }],
        difficulty: difficulty.NO_AUTO
    },
        {
        lead: 'Leviathan (full auto)',
        others: 'Gauntlet (mandatory), Bomber, FCI, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'seems a bit dicier than guided',
        videos: [{ url: 'https://youtu.be/kyCQ6JXDJvM' }],
        difficulty: difficulty.EASY
    },
]

export const mandaloreGeneric: dataType[] = [
    {
        lead: 'Boss Nass',
        others: 'The other gungans',
        notes: 'auto with Tarpal Omi, dont deselect reticule to build up stacks in Wave 1. can sometimes go wrong',
        videos: [{ url: 'https://youtu.be/fLPilo3n-gw' }],
        difficulty: difficulty.CAUTION,
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
        others: 'Marrok (o), Shin, L3, Qira',
        notes: 'L3s pretaunt is good here. Pause auto to target Moff Gideon in wave 2.',
        videos: [{ url: 'https://youtu.be/rF6NV7kLMpA' }],
        difficulty: difficulty.CAUTION,
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
        difficulty: difficulty.EASY,
        omi: true,
    },
    {
        lead: 'Omega (omi)',
        others: 'Bad Batch Mercenaries',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/oXkwJiE_EGg'}, { url: 'https://youtu.be/JuEnsbbFuT4?si=W7cLID0-I95kNy8h', creator: creators.avengerObs }],
        difficulty: difficulty.EASY,
        omi: true,
    },
    {
        lead: 'JMK (Ezra)',
        leadFull: 'Jedi Master Kenobi with Ezra Exile',
        others: 'Padme, CAT, Ezra Exile, GK',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/UaOt-HO-smQ' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Vane, SM-33, Silvo, Brutus',
        notes: 'auto, target Moff Gideon wave 2 to make things a bit faster',
        videos: [{ url: 'https://youtu.be/iXiC7WhOI8U' }],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malgus, Dooku, Bane, +1',
        notes: 'auto, Only 1/2',
        videos: [{ url: 'https://youtu.be/4ptGfbJBAvw' }],
        difficulty: difficulty.HARD
    },
]

export const mandaloreDTMG: dataType[] = [
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Night Trooper, Death Trooper Peridea, Captain Enoch (omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/SLiK2dv_sSw'}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    }
]