import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty, successRate, interactionType } from "~/models/data";

export const mixedQiraP4: dataType[] = [
    {
        lead: 'Leia',
        others: 'R2, Drogan, Qira, L3',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/rnj73wSUTrE' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Baylan',
        others: 'Shin, Marrok (omi), Qira, L3',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/nBP08l-0Lj4' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'SLKR',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'DRey, Malak, Qira, L3',
        notes: 'poke, auto',
        videos: [{url: 'https://youtu.be/kmFHKrKTX1c'}],
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Fulcrum, any 5th',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/Rmd5Ppxxyfs' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, CAT',
        notes: 'Wave 2 was a bit dicey, still won on full auto though. May require R9?',
        videos: [{ url: 'https://youtu.be/VNDsqSv-5hE' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'Hondo, Vane',
        notes: 'easy full auto',
        videos: [{ url: 'https://youtu.be/lzHXRa2FHKU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
]

export const mixedGenericP4: dataType[] = [
    {
        lead: 'Leia',
        others: 'R2, Drogan, Admiral Raddus',
        notes: 'auto, can add a 5th rebel if you\'d like but unnecessary',
        videos: [{ url: 'https://youtu.be/QLoZOYsI6h0' }],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'MQG, POW, GMY, Ahsoka',
        notes: 'auto, Last two are flexible',
        videos: [{ url: 'https://youtu.be/LpchaAwpVuk' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malak, Malgus, DR, Malicos',
        notes: 'auto, use sith instead of Malicos if possible',
        videos: [{ url: 'https://youtu.be/1LnWy0zcAWA' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Fulcrum +3',
        notes: 'auto, Ezra or spectre speeds things up',
        videos: [{ url: 'https://youtu.be/t6bxMOvhWdY' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'SLKR',
        others: 'DRey, Starkiller, Malicos',
        notes: 'auto, use FO if possible',
        videos: [{ url: 'https://youtu.be/cggvycdd5iI' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    // {
    //     lead: 'Mother Talzin',
    //     others: 'Old Daka, Merrin, Zombie',
    //     notes: 'auto, can add Asajj',
    //     videos: [{ url: 'https://www.youtube.com/watch?v=QxQHAEs1kHs', creator: creators.egnards }],
    //     difficulty: difficulty.VERY_EASY,
    //     successRate: successRate.CONSISTENT,
    //     interactionType: [interactionType.AUTO]
    // },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Padme, Snips, GK, Cody',
        notes: 'Imagine Cody is a flex here and you can likely 4 man this',
        videos: [{ url: 'https://youtu.be/K7yZyrvCObI?si=zgFyWI6C0mjYh_zE&t=3', creator: creators.pico }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
    },
    {
        lead: 'Reva',
        others: 'Marrok (omi), GI, 5B, 7S',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/bwZHmRAFWOA'}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Lord Vader',
        others: 'Piett, Dooku, Malicos',
        notes: 'auto, I imagine there are better teammates. I had no other options',
        videos: [{url: 'https://youtu.be/TpgdflmfBxo'}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'MQG, POW, CUP',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/QUmyeBZBCKc' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'other gungans (tarpals omi)',
        notes: 'aut',
        videos: [{ url: 'https://youtu.be/PQghgdpTI3o' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        omi: true,
    },
    {
        lead: 'Omega (omi)',
        others: 'Bad Batch Mercenaries',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Kzj93kyiKmM?si=oUrEfxpCHOBw0_bq', creator: creators.avengerObs }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Reva',
        others: 'GI, 5B, 7S',
        notes: 'auto, 4 man, not super smooth without omi',
        videos: [{url: 'https://youtu.be/Rey9_Rr0mnU'}],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'Tarkin',
        leadFull: 'Grand Moff Tarkin',
        others: 'Appo (omicron), CX, Disguised Clone Trooper, Scorch',
        notes: 'You do want the full complement of clones here',
        videos: [{ url: 'https://youtu.be/j1u6kaAtakw', }],
        difficulty: difficulty.EASY,
        successRate: successRate.NINETY_PERCENT,
        omi: true
    },
    {
        lead: 'Pirate King Hondo',
        leadFull: 'Pirate King Hondo Onaka',
        others: 'SM-33, Hondo, Vane',
        notes: 'easy full auto, Brutus and Silvo are good if you have them R8+',
        videos: [{ url: 'https://youtu.be/8JaAe5LrTzE' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'DTMG',
        leadFull: 'Dark Trooper Moff Gideon',
        others: 'Scout Trooper, Night Trooper, Death Trooper Peridia, Captain Enoch (omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/IvIIY5iBdbI'}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Depa Billaba (omicron), Temple Guard',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/vH6YIiUsXQ4' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'The Stranger',
        leadFull: 'The Stranger',
        others: 'Starkiller, Malicos, Scavenger Rey, Plo Koon',
        notes: 'full auto, last two replaceable, a bit dicey',
        videos: [{ url: 'https://youtu.be/DeCVAVWrbR8' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
]

export const jabbaP4: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boba, Krrsantan, +2',
        notes: 'Need Krrsantan, the more Hutt Cartel the better. Auto',
        videos: [{ url: 'https://youtu.be/pljI9oJdJEo' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    }
]

export const mixedFleetP4: dataType[] = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar, Emp Shuttle',
        notes: 'very difficult, semi auto (see video)',
        videos: [{ url: 'https://youtu.be/5rZYEDKdxCo' }],
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL]
    },
    {
        lead: 'Profundity (no Rogue One)',
        others: 'Outrider, Y Wing, Ghost starting, Phantom, MF, Biggs, Wedge reinf',
        notes: 'very difficult',
        videos: [{ url: 'https://youtu.be/kx9p09Z4DM0' }],
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.MANUAL]
    },
    {
        lead: 'Profundity (Rogue One)',
        others: 'Outrider, Ghost, Y wing starting, Rogue one, Phantom in reinforcements. Millennium Falcon is good if you have it',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/czrI8wjl3UY' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
]