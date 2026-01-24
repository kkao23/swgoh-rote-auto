import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty, successRate, interactionType } from "~/models/data";

export const shipsLSP2: dataType[] = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing, Phantom, Ghost, Biggs, Wedge',
        notes: 'target scythe, auto',
        videos: [{ url: 'https://youtu.be/CkHBVQJmZtk' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Profundity (R1, No MF)',
        others: 'Outrider, Y wing, Ghost, Rogue 1, Phantom',
        notes: 'target scythe, auto',
        videos: [{ url: 'https://youtu.be/dD9Eey116EY' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    }
]

export const jediLSP2: dataType[] = [
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra',
        others: 'Ezra exile, JKL, Kyle Katarn, Shaak Ti',
        notes: 'auto with KK omi',
        videos: [{ url: 'https://youtu.be/wom3RZrx9VQ' }, { url: 'https://www.youtube.com/watch?v=KzqvGPmEMqI', creator: creators.egnards }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'JMK (Ezra)',
        leadFull: 'Jedi Master Kenobi with Ezra',
        others: 'Shaak, Ahsoka, Ezra exile, GK',
        notes: 'auto, long, not reliable 2/2',
        videos: [{ url: 'https://youtu.be/_0J9LtUwj4U' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra',
        others: 'Ezra exile, any 3 jedi',
        notes: 'auto, I had Bastila, JKA and Plo and it was close at the end. Use better jedi for more consistency',
        videos: [{ url: 'https://youtu.be/d5uJfXLjlvc' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO],
    },
    {
        lead: 'JKL (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra',
        others: 'Ezra exile, Kyle Katarn, +2 (I had Bastila and JKA)',
        notes: 'deselect reticule, auto with KK omi',
        videos: [{ url: 'https://youtu.be/eggFQcIom2E' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        omi: true,
    },
    {
        lead: 'Kelleran Beq',
        leadFull: 'Kelleran Beq',
        others: 'Jocasta Nu, Shaak Ti, Temple Guard, Depa Billaba (omicron)',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/SPL5FC0Qdcc' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const leftLSP2: dataType[] = [
    {
        lead: 'BK Mandalore',
        leadFull: 'Bo Katan Mandalore',
        others: 'Rey, Paz, Beskar Mando, IG12',
        notes: 'not reliable on auto, only 1/2',
        videos: [{ url: 'https://youtu.be/W_AfGpB5RxY' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/2epBiIcFaG0' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Han, Chewie',
        notes: 'auto, last two replaceable, can occasionally get unlucky if Leia < R8',
        videos: [{ url: 'https://youtu.be/fFO75yKREfA' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Finn (omi)',
        others: 'Poe, Zorii, RH Finn, Rose',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/-T5DUTDHm6Y?si=enslsLffHD2qyfnW&t=381', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true,
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, GMY, Shaak Ti',
        notes: 'auto, deselect targeting reticule, need good mods on QA to get decoy out first',
        videos: [{ url: 'https://youtu.be/-4mjKaoesMs' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, Hera',
        notes: 'auto, can save Ezra for Jedi mission',
        videos: [{ url: 'https://youtu.be/5nRShbbHbAI' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GAS, Padme, CAT',
        notes: 'Deselect reticule. Need to do targeting. Target same enemy to reduce max health',
        videos: [{ url: 'https://youtu.be/IuyL502QQJo' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, 2/2 on full auto',
        videos: [{ url: 'https://youtu.be/i6NewbYrjqU' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]

export const rightLSP2: dataType[] = [
    {
        lead: 'Leia',
        others: 'Drogan, R2, Baze, Capt Rex',
        notes: 'auto, last two replaceable, can occasionally get unlucky',
        videos: [{ url: 'https://youtu.be/Od4-cr8woO8' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Saw',
        others: 'Luthen, Kyle (o), Cassian, Capt Rex',
        notes: 'only 1/2 auto',
        videos: [{ url: 'https://youtu.be/jX-X3SfQGUI' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO],
        omi: true
    }, {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +any',
        notes: 'auto, use Hera if available, can save Ezra for Jedi mission',
        videos: [{ url: 'https://youtu.be/aP8-BIqw0jk' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, Padme, CAT',
        notes: 'only 1/2 on auto. Deselect reticule',
        videos: [{ url: 'https://youtu.be/pYalwvB22qo' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.TARGET_START]
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/AwPI5dywqAQ' }],
        difficulty: difficulty.VERY_EASY,
        successRate: successRate.CONSISTENT,
        interactionType: [interactionType.AUTO],
        omi: true
    },
    {
        lead: 'QA (CUP)',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, Shaak Ti, CUP',
        notes: 'auto, deselect targeting reticule, need good mods on QA to get decoy out first',
        videos: [{ url: 'https://youtu.be/k1SV2V_ODjc' }],
        difficulty: difficulty.CAUTION,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.TARGET_START],
        targeted: true
    },
    {
        lead: 'Omega',
        others: 'other Bad Batch Mercenaries',
        notes: '1/2 on auto (no omi)',
        videos: [{ url: 'https://youtu.be/Mnzx15JilpQ' }],
        difficulty: difficulty.HARD,
        successRate: successRate.FIFTY_FIFTY,
        interactionType: [interactionType.AUTO]
    },
    {
        lead: 'Omega (Mercenary)',
        leadFull: 'Omega with Bad Batch Mercenaries',
        others: 'Crosshair, Wrecker, Batcher, Hunter',
        notes: 'omi Wrecker, auto but more consistent if you manually target wave 2',
        videos: [{ url: 'https://youtu.be/hssMBkkdQSk' }],
        difficulty: difficulty.EASY,
        successRate: successRate.USUALLY,
        interactionType: [interactionType.PAUSE_WAVE2],
        omi: true,
        targeted: true
    },
    // {
    //     lead: 'GAS with QA',
    //     leadFull: 'General Anakin Skywalker with Queen Amidala',
    //     others: 'Fives, Rex, Snips/Echo',
    //     notes: 'auto, Echo is better if not platooned. Need Fives as the off tank',
    //     videos: [{ url: 'https://youtu.be/eOXu2I5QuII' }],
    //     difficulty: difficulty.EASY
    // },
]

export const zeffoUnlock: dataType[] = [
    {
        lead: 'Cere',
        others: 'JKCK',
        notes: 'Two non lead omis on Cal. The white whale of auto',
        videos: [{ url: 'https://youtu.be/Ad_cJiVLLY0' }],
        difficulty: difficulty.NO_AUTO,
        successRate: successRate.UNRELIABLE,
        interactionType: [interactionType.AUTO],
        omi: true
    }
]
