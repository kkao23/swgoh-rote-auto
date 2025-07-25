import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const lsLeftP3: dataType[] = [
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, Padme, GK',
        notes: 'auto, not consistent 2/2',
        videos: [{ url: 'https://youtu.be/DiSqzfNlNww' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, JKL, +2 Jedi',
        notes: 'auto, JKCK is good if available, Ezra mandatory',
        videos: [{ url: 'https://youtu.be/R_3rOQK49XQ' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JKCK (Omis)',
        leadFull: 'Jedi Knight Cal Kestis',
        others: 'Kyle Katarn, +3 Jedi',
        notes: 'auto, omis on JKCK lead and Kyle Katarn',
        videos: [{ url: 'https://youtu.be/R_3rOQK49XQ' }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'Boss Nass',
        others: 'Other gungans (tarpal omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/TY97HzhePAg?si=zo9rbCRZ-_JOfg8N&t=231', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'Leia',
        others: 'R2, Drogan, Han, Chewie',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/gC6v0taN3Jw' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, Hera',
        notes: 'auto, can save Ezra for somewher else',
        videos: [{ url: 'https://youtu.be/SWi--w5QKws' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, Shaak Ti, CUP',
        notes: 'auto, deselect targeting reticule',
        videos: [{ url: 'https://youtu.be/rUBUeI9eQQA' }],
        difficulty: difficulty.EASY,
    },
]

export const lsRightP3: dataType[] = [
    {
        lead: 'Leia',
        others: 'R2, Drogan +2',
        notes: 'auto, focus mara wave 2',
        videos: [{ url: 'https://youtu.be/xrl2EVOFLxQ' }],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +1',
        notes: 'auto, use Ezra and Hera if available',
        videos: [{ url: 'https://youtu.be/3T8M7wuyTuI' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'auto, Tarpals Omi',
        videos: [{ url: 'https://www.youtube.com/watch?v=bwDYfbb_W-A', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, GMY, Shaak Ti',
        notes: 'auto, deselect targeting, target mara in wave 2',
        videos: [{ url: 'https://youtu.be/YmLMvgbqW3U' }],
        difficulty: difficulty.CAUTION,
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, Padme, GK',
        notes: 'only 1/2 on auto. would need to save force leap for mara in wave 2',
        videos: [{ url: 'https://youtu.be/F1CGB8sTCA4' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, JKL, +2 Jedi',
        notes: 'auto, JKCK is good if available, Ezra mandatory. Target Mara wave 2',
        videos: [{ url: 'https://youtu.be/6LCLkhSg5AY' }],
        difficulty: difficulty.EASY
    },
        {
        lead: 'Omega',
        others: 'other Bad Batch Mercenaries',
        notes: '1/2 on auto (no omi)',
        videos: [{ url: 'https://youtu.be/8nRobwqifro' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Omega (omicron)',
        others: 'other Bad Batch Mercenaries',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/foOES5g8prg' }],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
]

export const sawP3: dataType[] = [
    {
        lead: 'Saw (Drogan)',
        leadFull: 'Saw with Drogan',
        others: 'Capt Rex, Luthen, Cassian, Drogan',
        notes: 'auto, target purge troopers',
        videos: [{ url: 'https://youtu.be/K4HObnZm0TU' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Saw (Kyle)',
        leadFull: 'Saw with Kyle Katarn',
        others: 'Capt Rex, Luthen, Cassian, Kyle (o)',
        notes: 'auto, target purge troopers',
        videos: [{ url: 'https://youtu.be/FCEEsGXMtOA' }],
        difficulty: difficulty.CAUTION,
        omi: true
    }
]

export const wookies: dataType[] = [
    {
        lead: 'Tarfull',
        others: 'Chewbacca, Chewpio, Zaalbaar, Clone Wars Chewie',
        notes: 'Pico has them all R8, not sure if possible at R7. Looked safe though',
        videos: [{url: 'https://youtu.be/TY97HzhePAg?si=ewaYO47t0fspuZwl&t=463', creator: creators.pico}],
        difficulty: difficulty.EASY,
    }
]