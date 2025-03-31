// P1
import { leftDSP1 } from "./p1/DS";
import { bottomDSP1 } from "./p1/DS";
import { lvP1 } from "./p1/DS";
import { topDSP1 } from "./p1/DS";
import { shipsDSP1 } from "./p1/DS";

import { maceKitP1 } from "./p1/LS";
import { jediP1 } from "./p1/LS";
import { genericLSP1 } from "./p1/LS";
import { shipsLSP1 } from "./p1/LS";

import { qiraMixedP1 } from "./p1/Mixed";
import {  mixedP1 } from "./p1/Mixed";
import { drAphraP1 } from "./p1/Mixed";
import { jabbaP1 } from "./p1/Mixed";
import { shipsP1 } from "./p1/Mixed"; 
// P2

import { hondoMixedP2 } from "./p2/Mixed";
import { shipsMixedP2 } from "./p2/Mixed";
import { mixedP2 } from "./p2/Mixed";
import { jabbaP2 } from "./p2/Mixed";
import { youngLandoP2 } from "./p2/Mixed";

import { zeffoUnlock } from "./p2/LS";
import { rightLSP2 } from "./p2/LS";
import { leftLSP2 } from "./p2/LS";
import { jediLSP2 } from "./p2/LS";
import { shipsLSP2 } from "./p2/LS";

import { shipsDSP2 } from "./p2/DS";
import { nexuDSP2 } from "./p2/DS";
import { reekDSP2 } from "./p2/DS";
import { acklayDSP2 } from "./p2/DS";

// P3
import { boKatanP3 } from "./p3/Mixed";
import { revaP3 } from "./p3/Mixed";
import { jabbaP3 } from "./p3/Mixed";
import { fennecP3 } from "./p3/Mixed";
import { mixedTopLeftP3 } from "./p3/Mixed";
import { mixedP3Ships } from "./p3/Mixed";

import { drAphraP3 } from "./p3/DS";
import { merrinP3 } from "./p3/DS";
import { dsEmpireP3 } from "./p3/DS";
import { dsGenericP3 } from "./p3/DS";

import { wookies } from "./p3/LS"; 
import { sawP3 } from "./p3/LS"; 
import { lsRightP3 } from "./p3/LS"; 
import { lsLeftP3 } from "./p3/LS"; 

// P4
import { lsShipsP4 } from "./p4/LS";
import { lsGenericP4 } from "./p4/LS";
import { jediLSP4 } from "./p4/LS";

import { mixedFleetP4 } from "./p4/Mixed";
import { jabbaP4 } from "./p4/Mixed";
import { mixedGenericP4 } from "./p4/Mixed";
import { mixedQiraP4 } from "./p4/Mixed";

import { dsInqP4 } from "./p4/DS";
import { dsRightP4 } from "./p4/DS";
import { dsMidP4 } from "./p4/DS";

// P5

import { mixedFleetP5 } from "./p5/Mixed";
import { jabbaP5 } from "./p5/Mixed";
import { mixedGenericP5 } from "./p5/Mixed";

import { lsGenericP5 } from "./p5/LS";

// zeffo
import { zeffoCombat } from "./zeffo/LS";
import { zeffoUFU } from "./zeffo/LS";
import { zeffoJedi } from "./zeffo/LS";
import { zeffoFleets } from "./zeffo/LS";
import { clonesSM } from "./zeffo/LS";

// mandalore
import { mandaloreDTMG } from "./mandalore/Mixed";
import { mandaloreFleets } from "./mandalore/Mixed";
import { mandaloreGeneric } from "./mandalore/Mixed";

export const data = {
    phase1: {
        ds: {
            left: leftDSP1,
            bottom: bottomDSP1,
            top: topDSP1,
            lv: lvP1,
            ships: shipsDSP1,
        },
        mixed: {
            qira: qiraMixedP1,
            mixed: mixedP1,
            jabba: jabbaP1,
            aphra: drAphraP1,
            ships: shipsP1,
        },
        ls: {
            ships: shipsLSP1,
            generic: genericLSP1,
            maceKitP1: maceKitP1,
            jediP1: jediP1
        },
    },
    phase2: {
        ds: {
            acklay: acklayDSP2,
            reek: reekDSP2,
            nexu: nexuDSP2,
            ships: shipsDSP2,
        },
        mixed: {
            hondo: hondoMixedP2,
            ships: shipsMixedP2,
            jabba: jabbaP2,
            youngLando: youngLandoP2,
            combat: mixedP2
        },
        ls: {
            ships: shipsLSP2,
            jedi: jediLSP2,
            left: leftLSP2,
            right: rightLSP2,
            zeffo: zeffoUnlock
        },
    },
    phase3: {
        ds: {
            generic: dsGenericP3,
            empire: dsEmpireP3,
            aphra: drAphraP3,
            merrin: merrinP3,
        },
        ls: {
            saw: sawP3,
            left: lsLeftP3,
            right: lsRightP3,
            wookies: wookies,
        },
        mixed: {
            boKatan: boKatanP3,
            reva: revaP3,
            topLeft: mixedTopLeftP3,
            jabba: jabbaP3,
            fennec: fennecP3,
            fleet: mixedP3Ships,
        },
        zeffo: {
            fleets: zeffoFleets,
            jedi: zeffoJedi,
            clones: clonesSM,
            ufu: zeffoUFU,
            combat: zeffoCombat,
        }
    },
    phase4: {
        ds: {
            inqs: dsInqP4,
            mid: dsMidP4,
            right: dsRightP4
        },
        mixed: {
            fleet: mixedFleetP4,
            generic: mixedGenericP4,
            qira: mixedQiraP4,
            jabba: jabbaP4,
        },
        ls: {
            ships: lsShipsP4,
            generic: lsGenericP4,
            jedi: jediLSP4,
        },
        mandalore: {
            fleets: mandaloreFleets,
            generic: mandaloreGeneric,
            dtmg: mandaloreDTMG,
        }
    },
    phase5: {
        mixed: {
            generic: mixedGenericP5,
            jabba: jabbaP5,
            fleet: mixedFleetP5
        },
        ls: {
            generic: lsGenericP5,
        }
    },
    special: {
        all: {
            qiraP1: qiraMixedP1,
            zeffo: zeffoUnlock,
            clones: clonesSM,
            reva: revaP3,
            boKatan: boKatanP3,
            merrin: merrinP3,
            saw: sawP3,
            inqs: dsInqP4,
            qiraP4: mixedQiraP4,
        }
    }
}