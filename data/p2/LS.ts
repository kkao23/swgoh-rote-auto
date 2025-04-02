import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const shipsLSP2: dataType[] = [
    {
        lead: 'Profundity',
        others: 'HMF, Outrider, Y wing, Phantom, Ghost, Biggs, Wedge',
        notes: 'target scythe, auto',
        videos: [{ url: 'https://youtu.be/dD9Eey116EY' }],
        difficulty: difficulty.VERY_EASY
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
        omi: true,
    },
    {
        lead: 'JMK (Ezra)',
        leadFull: 'Jedi Master Kenobi with Ezra',
        others: 'Shaak, Ahsoka, Ezra exile, GK',
        notes: 'auto, long, not reliable 2/2',
        videos: [{ url: 'https://youtu.be/_0J9LtUwj4U' }],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'JML (Ezra)',
        leadFull: 'Jedi Master Luke with Ezra',
        others: 'Ezra exile, any 3 jedi',
        notes: 'auto, I had Bastila, JKA and Plo and it was close at the end. Use better jedi for more consistency',
        videos: [{ url: 'https://youtu.be/d5uJfXLjlvc' }],
        difficulty: difficulty.EASY,
    },
]

export const leftLSP2: dataType[] = [
    {
        lead: 'BK Mandalore',
        leadFull: 'Bo Katan Mandalore',
        others: 'Rey, Paz, Beskar Mando, IG12',
        notes: 'not reliable on auto, only 1/2',
        videos: [{ url: 'https://youtu.be/W_AfGpB5RxY' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/2epBiIcFaG0' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
    {
        lead: 'Leia',
        others: 'Drogan, R2, Han, Chewie',
        notes: 'auto, last two replaceable, can occasionally get unlucky if Leia < R8',
        videos: [{ url: 'https://youtu.be/fFO75yKREfA' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Finn (omi)',
        others: 'Poe, Zorii, RH Finn, Rose',
        notes: 'auto',
        videos: [{url: 'https://youtu.be/-T5DUTDHm6Y?si=enslsLffHD2qyfnW&t=381', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    },
    {
        lead: 'QA',
        leadFull: 'Queen Amidala',
        others: 'POW, MQG, GMY, Shaak Ti',
        notes: 'auto, deselect targeting reticule, need good mods on QA to get decoy out first',
        videos: [{ url: 'https://youtu.be/-4mjKaoesMs' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, Hera',
        notes: 'auto, can save Ezra for Jedi mission',
        videos: [{ url: 'https://youtu.be/5nRShbbHbAI' }],
        difficulty: difficulty.VERY_EASY
    },
]

export const rightLSP2: dataType[] = [
    {
        lead: 'Leia',
        others: 'Drogan, R2, Baze, Capt Rex',
        notes: 'auto, last two replaceable, can occasionally get unlucky',
        videos: [{ url: 'https://youtu.be/Od4-cr8woO8' }],
        difficulty: difficulty.EASY
    },
    {
        lead: 'Saw',
        others: 'Luthen, Kyle (o), Cassian, Capt Rex',
        notes: 'only 1/2 auto',
        videos: [{ url: 'https://youtu.be/jX-X3SfQGUI' }],
        difficulty: difficulty.HARD,
        omi: true
    }, {
        lead: 'Ahsoka Tano',
        others: 'Padawan Sabine, Huyang, Fulcrum, +any',
        notes: 'auto, use Hera if available, can save Ezra for Jedi mission',
        videos: [{ url: 'https://youtu.be/aP8-BIqw0jk' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'JMK',
        leadFull: 'Jedi Master Kenobi',
        others: 'Snips, GK, Padme, CAT',
        notes: 'only 1/2 on auto. Deselect reticule',
        videos: [{ url: 'https://youtu.be/pYalwvB22qo' }],
        difficulty: difficulty.HARD
    },
    {
        lead: 'Boss Nass',
        others: 'Gungans',
        notes: 'easy auto with Tarpals Omi',
        videos: [{ url: 'https://youtu.be/AwPI5dywqAQ' }],
        difficulty: difficulty.VERY_EASY,
        omi: true
    },
]

export const zeffoUnlock: dataType[] = [
    {
        lead: 'Cere',
        others: 'JKCK',
        notes: 'Two non lead omis on Cal. The white whale of auto',
        videos: [{ url: 'https://youtu.be/Ad_cJiVLLY0' }],
        difficulty: difficulty.NO_AUTO,
        omi: true
    }
]