import { type data as dataType } from "~/models/data";
import { creators } from "~/models/creators";
import { difficulty } from "~/models/data";

export const mixedFleetP5: dataType[] = [
    {
        lead: 'Leviathan',
        others: 'FCI, Bomber, Dorito, Assassin, MK6 Interceptor, Scimitar',
        notes: 'auto but pause for MK6 Instakill',
        videos: [{ url: 'https://youtu.be/RnCTLQJblO8' }],
        difficulty: difficulty.CAUTION
    },
    {
        lead: 'Executor',
        others: 'HT, RC, Punishing One, XB, Slave 1, IG2000',
        notes: 'auto',
        videos: [{ url: 'https://youtu.be/7cTPzAAqRa4' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Executor (no RC)',
        others: 'HT, Punishing One, XB, Slave 1, IG2000',
        notes: 'auto, untarget HT',
        videos: [{ url: 'https://youtu.be/uDfsGkP-cXM' }],
        difficulty: difficulty.VERY_EASY
    }
]

export const mixedGenericP5: dataType[] = [
    {
        lead: 'Ahsoka Tano',
        others: 'Any R9s',
        notes: 'Auto',
        videos: [{ url: 'https://youtu.be/OCGLZm1SJiM' }],
        difficulty: difficulty.VERY_EASY
    },
    {
        lead: 'Lord Vader',
        others: 'Maul, RG, 9S, Darth Vader',
        notes: 'Auto, only 1/2',
        videos: [{url: 'https://youtu.be/1t_aEW7O9Zk?si=th-cDggFM7cPamGZ&t=14', creator: creators.pico}],
        difficulty: difficulty.HARD
    }
]

export const jabbaP5:dataType[] = [
    {
        lead: 'Jabba',
        others: 'Boosh, Krrsantan, Gam Guard (omi), Bossk',
        notes: 'auto, replace Bossk with Hutt Cartel if possible',
        videos: [{url: 'https://youtu.be/1t_aEW7O9Zk?si=FZVN2wEADXdQHkT2&t=156', creator: creators.pico}],
        difficulty: difficulty.VERY_EASY,
        omi: true,
    }
]