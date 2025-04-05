import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const lsShipsP4: dataType[] = [
    {
        lead: 'Profundity',
        others: 'MF, Outrider, Y Wing, Wedge, Biggs, Phantom, Ghost',
        notes: 'auto, Dont use Ghost if required in Mixed',
        videos: [{ url: 'https://youtu.be/-AZjA6D9sK4' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Negotiator',
        others: 'JKA, Y Wing, Marauder, Plo, Ahsoka, Fives, Rex',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/D30RG8s3HDQ' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Raddus',
        others: 'Rey MF, Poe XWing, Res Bomber, Comeuppance, Res X Wing',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/drEhB7NLcZU' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Home One',
        others: 'MF, Y Wing, Ravens Claw, Outrider, Phantom, Ghost, Cassian',
        notes: 'auto, Dont use Ghost if required in Mixed',
        videos: [{ url: 'https://youtu.be/67erqo3zyvA' }],
        difficulty: difficulty.VERY_EASY
    },
]

export const lsGenericP4: dataType[] = [
    {
        lead: 'Leia',
        others: 'Han, Cassian, Raddus, R2-D2',
        notes: 'auto, Drogan if you have him',
        videos: [{ url: 'https://youtu.be/C6F4fIWlP-I' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, Yoda, Padme',
        notes: 'auto, other two can be any GR',
        videos: [{ url: 'https://youtu.be/6YzDrnBGFvw' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Padme, Snips, GK, CAT',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/qPc-UJDjAt0' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'Tarpals omi, auto',
        videos: [{ url: 'https://youtu.be/xCacWaNrwto' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Any',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/nNTovvlMApI' }],
        difficulty: difficulty.VERY_EASY
    }
]

export const jediLSP4: dataType[] = [
    {
        lead: 'JMK (Ezra)',
        leadFull: 'Jedi Master Kenobi with Ezra Exile',
        others: 'GAS, Ahsoka, Ezra Exile, GK',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/nVtmzJh4xlk0' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, GAS, GMY, Plo',
        notes: 'auto, replace Plo if possible',
        videos: [{ url: 'https://youtu.be/OcVbpC8FHmE' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JMK (no Ezra, no bros)',
        leadFull: 'Jedi Master Kenobi without Ezra Exile or POW/MQJ',
        others: 'GAS, Ahsoka, GK, Plo',
        notes: 'auto, only 1/2',
        videos: [{ url: 'https://youtu.be/nzJ8oUrygqc' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'JML (bros, no Ezra)',
        leadFull: 'Jedi Master Luke without Ezra Exile with POW/MQJ',
        others: 'GAS, GMY, POW, MQG',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/5tJavs7rly4' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JMK (bros, no Ezra)',
        leadFull: 'Jedi Master Kenobi without Ezra Exile with POW/MQJ',
        others: 'GAS, GK, POW, MQG',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/9ZKHdxBljyc' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JML (KK Omi)',
        leadFull: 'Jedi Master Luke with Kyle Katarn OMi',
        others: 'Kyle Katarn (omi), GAS, GMY, GK',
        notes: 'auto, GMY and GK are likely replaceable',
        videos: [{ url: 'https://www.youtube.com/watch?v=7N2-JbEer7k', creator: creators.egnards }],
        difficulty: difficulty.EASY
    },
]