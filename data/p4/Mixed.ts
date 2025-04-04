import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const mixedQiraP4: dataType[] = [
    {
        lead: 'Leia',
        others: 'R2, Drogan, Qira, L3',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/rnj73wSUTrE' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Baylan',
        others: 'Shin, Marrok (omi), Qira, L3',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/nBP08l-0Lj4' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'SLKR',
        leadFull: 'Supreme Leader Kylo Ren',
        others: 'DRey, Malak, Qira, L3',
        notes: 'poke, auto',
        videos: [{url: 'https://youtu.be/kmFHKrKTX1c'}],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Fulcrum, any 5th',
        notes: 'easy auto',
        videos: [{ url: 'https://youtu.be/Rmd5Ppxxyfs' }],
        difficulty: difficulty.VERY_EASY
    },
]

export const mixedGenericP4: dataType[] = [
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'MQG, POW, GMY, Ahsoka',
        notes: 'auto, Last two are flexible',
        videos: [{ url: 'https://youtu.be/LpchaAwpVuk' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SEE',
        leadFull: 'Sith Eternal Emperor',
        others: 'Malak, Malgus, DR, Malicos',
        notes: 'auto, use sith instead of Malicos if possible',
        videos: [{ url: 'https://youtu.be/1LnWy0zcAWA' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Fulcrum +3',
        notes: 'auto, Ezra or spectre speeds things up',
        videos: [{ url: 'https://youtu.be/t6bxMOvhWdY' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'SLKR',
        others: 'DRey, Starkiller, Malicos',
        notes: 'auto, use FO if possible',
        videos: [{ url: 'https://youtu.be/cggvycdd5iI' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Mother Talzin',
        others: 'Old Daka, Merrin, Zombie',
        notes: 'auto, can add Asajj',
        videos: [{ url: 'https://www.youtube.com/watch?v=QxQHAEs1kHs', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Leia',
        others: 'R2, Drogan, Han, SRP',
        notes: 'auto, last two likely replaceable',
        videos: [{ url: 'https://www.youtube.com/watch?v=na9zOBWrZF8', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Padme, Snips, GK, Cody',
        notes: 'Imagine Cody is a flex here and you can likely 4 man this',
        videos: [{ url: 'https://youtu.be/K7yZyrvCObI?si=zgFyWI6C0mjYh_zE&t=3', creator: creators.pico }],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'Reva',
        others: 'Marrok (omi), GI, 5B, 7S',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/bwZHmRAFWOA'}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'Lord Vader',
        others: 'Piett, Dooku, Malicos',
        notes: 'auto, I imagine there are better teammates. I had no other options',
        videos: [{url: 'https://youtu.be/TpgdflmfBxo'}],
        difficulty: difficulty.VERY_EASY,
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'MQG, POW, CUP',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/QUmyeBZBCKc' }],
        difficulty: difficulty.VERY_EASY
    },
]

export const jabbaP4: dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boba, Krrsantan, Skiff Lando, Booush',
        notes: 'easy auto',
        videos: [{ url: 'https://www.youtube.com/watch?v=HkAhZSIkrLo', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY
    }
]

export const mixedFleetP4: dataType[] = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar, Emp Shuttle',
        notes: 'Tedious, but works, semi auto',
        videos: [{ url: 'https://youtu.be/5rZYEDKdxCo' }],
        difficulty: difficulty.NO_AUTO,
    }
]