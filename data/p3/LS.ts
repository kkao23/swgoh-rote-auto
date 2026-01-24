import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty, successRate, interactionType } from "~/models/data";

export const lsLeftP3: dataType[] = [
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, Padme, GK',
        notes: 'auto, not consistent 2/2',
        videos: [{ url: 'https://youtu.be/DiSqzfNlNww' }],
        difficulty: difficulty.EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, JKL, +2 Jedi',
        notes: 'auto, JKCK is good if available, Ezra mandatory',
        videos: [{ url: 'https://youtu.be/R_3rOQK49XQ' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JKCK (Omis)',
        leadFull: 'Jedi Knight Cal Kestis',
        others: 'Kyle Katarn, +3 Jedi',
        notes: 'auto, omis on JKCK lead and Kyle Katarn',
        videos: [{ url: 'https://youtu.be/R_3rOQK49XQ' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Boss Nass',
        others: 'Other gungans (tarpal omi)',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/TY97HzhePAg?si=zo9rbCRZ-_JOfg8N&t=231', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Leia',
        others: 'R2, Drogan, Han, Chewie',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/gC6v0taN3Jw' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, Hera',
        notes: 'auto, can save Ezra for somewher else',
        videos: [{ url: 'https://youtu.be/SWi--w5QKws' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, Shaak Ti, CUP',
        notes: 'auto, deselect targeting reticule',
        videos: [{ url: 'https://youtu.be/rUBUeI9eQQA' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true,
    },
    // {
    //     lead: 'GAS with QA',
    //     leadFull: 'General Anakin Skywalker with Queen Amidala',
    //     others: 'Rex, Echo, Fives',
    //     notes: 'auto, but currently theres a bug that makes Fives taunt',
    //     videos: [{ url: 'https://youtu.be/DctCHNqsOEg' }],
    //     difficulty: difficulty.VERY_EASY
    // },
    {
        lead: 'Omega (omicron)',
        others: 'other Bad Batch Mercenaries',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/YR4PCMzh0QI' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Temple Guard, Depa Billaba (omicron)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/Ez1HYwJ8aZY' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const lsRightP3: dataType[] = [
    {
        lead: 'Leia',
        others: 'R2, Drogan +2',
        notes: 'auto, focus mara wave 2',
        videos: [{ url: 'https://youtu.be/xrl2EVOFLxQ' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +1',
        notes: 'auto, use Ezra and Hera if available',
        videos: [{ url: 'https://youtu.be/3T8M7wuyTuI' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'auto, Tarpals Omi',
        videos: [{ url: 'https://www.youtube.com/watch?v=bwDYfbb_W-A', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, GMY, Shaak Ti',
        notes: 'auto, deselect targeting, target mara in wave 2, not totally consistent',
        videos: [{ url: 'https://youtu.be/YmLMvgbqW3U' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'CAT, Snips, Padme, GK',
        notes: 'only 1/2 on auto. would need to save force leap for mara in wave 2',
        videos: [{ url: 'https://youtu.be/F1CGB8sTCA4' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra Exile',
        others: 'Ezra Exile, JKL, +2 Jedi',
        notes: 'auto, JKCK is good if available, Ezra mandatory. Target Mara wave 2',
        videos: [{ url: 'https://youtu.be/6LCLkhSg5AY' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2]
    },
        {
        lead: 'Omega',
        others: 'other Bad Batch Mercenaries',
        notes: '1/2 on auto (no omi)',
        videos: [{ url: 'https://youtu.be/8nRobwqifro' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega (omicron)',
        others: 'other Bad Batch Mercenaries',
        notes: 'easy auto with omi',
        videos: [{ url: 'https://youtu.be/foOES5g8prg' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'JMMW',
        leadFull: 'Jedi Master Mace Windu',
        others: 'Jocasta Nu, Kelleran Beq, Depa Billaba (omicron), Temple Guard',
        notes: 'auto, may want to focus down mara wave 2',
        videos: [{ url: 'https://youtu.be/OKNAs62Omco' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    // {
    //     lead: 'GAS with QA',
    //     leadFull: 'General Anakin Skywalker with Queen Amidala',
    //     others: 'Rex, Echo, Fives',
    //     notes: 'auto, but target Mara then Purge troopers wave 2',
    //     videos: [{ url: 'https://youtu.be/DWqpQlVv0rA' }],
    //     difficulty: difficulty.EASY
    // },
]

export const sawP3: dataType[] = [
    {
        lead: 'Saw (Drogan)',
        leadFull: 'Saw with Drogan',
        others: 'Capt Rex, Luthen, Cassian, Drogan',
        notes: 'auto, target purge troopers',
        videos: [{ url: 'https://youtu.be/K4HObnZm0TU' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Saw (Kyle)',
        leadFull: 'Saw with Kyle Katarn',
        others: 'Capt Rex, Luthen, Cassian, Kyle (o)',
        notes: 'auto, target purge troopers',
        videos: [{ url: 'https://youtu.be/FCEEsGXMtOA' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true,
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
        successRate: successRate.USUALLY,
    }
]

export const shipsLSP3: dataType[] = [
    {
        lead: 'Profundity (no MF)',
        others: 'Outrider, Y wing, Ghost, Phantom, Cassian, Biggs, Wedge',
        notes: 'If you have to platoon MF. target scythe, basic to Outrider, built ult. not 100% consistent',
        videos: [{ url: 'https://youtu.be/El32c9zggjA' }],
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.TARGET_START]
    }
]