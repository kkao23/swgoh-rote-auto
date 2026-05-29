import fs from 'fs';
import path from 'path';

const DATA_DIR = 'C:/repos/rote_nuxt/rote-nuxt/data';
const SUGGESTIONS_FILE = 'C:/repos/rote_nuxt/rote-nuxt/scripts/parsed_suggestions.json';

// Read parsed suggestions
const suggestions = JSON.parse(fs.readFileSync(SUGGESTIONS_FILE, 'utf-8'));

// === POSITION TO ARRAY MAPPING ===
const POSITION_MAP = {
    'P1|DS|Fleet':                   { file: 'p1/DS.ts', array: 'shipsDSP1' },
    'P1|DS|Left (Nute)':             { file: 'p1/DS.ts', array: 'leftDSP1' },
    'P1|DS|Middle':                  { file: 'p1/DS.ts', array: 'topDSP1' },
    'P1|DS|Bot (Wat)':              { file: 'p1/DS.ts', array: 'bottomDSP1' },
    'P1|LS|Jedi':                    { file: 'p1/LS.ts', array: 'jediP1' },
    'P1|LS|Combat':                  { file: 'p1/LS.ts', array: 'genericLSP1' },
    'P1|LS|Top Left':                { file: 'p1/LS.ts', array: 'genericLSP1' },
    'P1|LS|Mace/Kit':               { file: 'p1/LS.ts', array: 'maceKitP1' },
    'P1|Mixed|Combat':               { file: 'p1/Mixed.ts', array: 'mixedP1' },
    'P1|Mixed|Mixed':                { file: 'p1/Mixed.ts', array: 'mixedP1' },
    'P1|Mixed|Qira':                { file: 'p1/Mixed.ts', array: 'qiraMixedP1' },
    'P1|Mixed|sm':                   { file: 'p1/Mixed.ts', array: 'qiraMixedP1' },
    'P1|Mixed|Aphra':               { file: 'p1/Mixed.ts', array: 'drAphraP1' },
    'P2|DS|Ackalay':                { file: 'p2/DS.ts', array: 'acklayDSP2' },
    'P2|DS|Acklay':                 { file: 'p2/DS.ts', array: 'acklayDSP2' },
    'P2|LS|Jedi':                    { file: 'p2/LS.ts', array: 'jediLSP2' },
    'P2|LS|Left':                    { file: 'p2/LS.ts', array: 'leftLSP2' },
    'P2|LS|Right':                   { file: 'p2/LS.ts', array: 'rightLSP2' },
    'P2|LS|CM':                      { file: 'p2/LS.ts', array: 'leftLSP2' },
    'P2|LS|Fleet':                   { file: 'p2/LS.ts', array: 'shipsLSP2' },
    'P2|Mixed|Combat':               { file: 'p2/Mixed.ts', array: 'mixedP2' },
    'P2|Mixed|P2 Mixed Combat':      { file: 'p2/Mixed.ts', array: 'mixedP2' },
    'P2|Mixed|Hondo':               { file: 'p2/Mixed.ts', array: 'hondoMixedP2' },
    'P2|Mixed|Top':                  { file: 'p2/Mixed.ts', array: 'mixedP2' },
    'P3|DS|Empire':                  { file: 'p3/DS.ts', array: 'dsEmpireP3' },
    'P3|DS|Dr. Aphra':              { file: 'p3/DS.ts', array: 'drAphraP3' },
    'P3|DS|Dr Aphra':               { file: 'p3/DS.ts', array: 'drAphraP3' },
    'P3|DS|Aphra':                  { file: 'p3/DS.ts', array: 'drAphraP3' },
    'P3|DS|Aphra Mission':          { file: 'p3/DS.ts', array: 'drAphraP3' },
    'P3|DS|Empire Special Mission':  { file: 'p3/DS.ts', array: 'dsEmpireP3' },
    'P3|DS|Bottom Right':            { file: 'p3/DS.ts', array: 'dsEmpireP3' },
    'P3|DS|Far Right':               { file: 'p3/DS.ts', array: 'dsEmpireP3' },
    'P3|DS|Combat':                  { file: 'p3/DS.ts', array: 'dsGenericP3' },
    'P3|DS|3rd CM(from top), on the right': { file: 'p3/DS.ts', array: 'dsEmpireP3' },
    'P3|LS|Left':                    { file: 'p3/LS.ts', array: 'lsLeftP3' },
    'P3|LS|Right (Mara)':           { file: 'p3/LS.ts', array: 'lsRightP3' },
    'P3|LS|Bottom Left':             { file: 'p3/LS.ts', array: 'lsLeftP3' },
    'P3|LS|Top left (Wookiee)':     { file: 'p3/LS.ts', array: 'wookies' },
    'P3|LS|Wookies':                { file: 'p3/LS.ts', array: 'wookies' },
    'P3|Mixed|Combat':               { file: 'p3/Mixed.ts', array: 'revaP3' },
    'P3|Mixed|Top Left':             { file: 'p3/Mixed.ts', array: 'mixedTopLeftP3' },
    'P3|Mixed|phase3 mixed Fennec':  { file: 'p3/Mixed.ts', array: 'fennecP3' },
    'P4|DS|Rt':                      { file: 'p4/DS.ts', array: 'dsMidRightP4' },
    'P4|DS|Not scary one':           { file: 'p4/DS.ts', array: 'dsMidRightP4' },
    'P4|DS|Combat':                  { file: 'p4/DS.ts', array: 'dsMidRightP4' },
    'P4|DS|Bottom':                  { file: 'p4/DS.ts', array: 'dsMidRightP4' },
    'P4|LS|Combat':                  { file: 'p4/LS.ts', array: 'lsGenericP4' },
    'P4|LS|Jedi':                    { file: 'p4/LS.ts', array: 'jediLSP4' },
    'P4|LS|CM':                      { file: 'p4/LS.ts', array: 'lsGenericP4' },
    'P4|Mixed|Combat':               { file: 'p4/Mixed.ts', array: 'mixedGenericP4' },
    'P4|Mixed|CM':                   { file: 'p4/Mixed.ts', array: 'mixedGenericP4' },
    'P4|Mixed|Fleet':                { file: 'p4/Mixed.ts', array: 'mixedFleetP4' },
    'P5|DS|Right':                   { file: 'p5/DS.ts', array: 'dsBottomRightP5' },
    'P5|DS|Top':                     { file: 'p5/DS.ts', array: 'dsTopMidP5' },
    'P5|LS|Bottom Left':             { file: 'p5/LS.ts', array: 'lsBottomP5' },
    'P5|LS|Top Mid':                 { file: 'p5/LS.ts', array: 'lsTopMidP5' },
    'P5|Mixed|Jabba':               { file: 'p5/Mixed.ts', array: 'jabbaP5' },
    'P5|Mixed|Young Han & Vandor SM': { file: 'p5/Mixed.ts', array: 'youngHanP5' },
    'P6|Mixed|Bottom left':          { file: 'p6/Mixed.ts', array: 'bottomLeftMixedP6' },
    'P6|Mixed|Left':                 { file: 'p6/Mixed.ts', array: 'bottomLeftMixedP6' },
    'Zeffo|LS|Combat':               { file: 'zeffo/LS.ts', array: 'zeffoCombat' },
    'Zeffo|LS|Jedi':                { file: 'zeffo/LS.ts', array: 'zeffoJedi' },
    'Zeffo|LS|UFU':                 { file: 'zeffo/LS.ts', array: 'zeffoUFU' },
    'Zeffo|LS|JKCK mission':       { file: 'zeffo/LS.ts', array: 'zeffoCombat' },
    'Zeffo|LS|CM':                   { file: 'zeffo/LS.ts', array: 'zeffoCombat' },
    'Zeffo|Mixed|JKCK':            { file: 'zeffo/LS.ts', array: 'zeffoCombat' },
    'Zeffo|Mixed|Top RIght':        { file: 'zeffo/LS.ts', array: 'zeffoCombat' },
    'Mandalore|Mixed|Combat':        { file: 'mandalore/Mixed.ts', array: 'mandaloreGeneric' },
    'Mandalore|Mixed|Combat Top':    { file: 'mandalore/Mixed.ts', array: 'mandaloreGeneric' },
    'Mandalore|Mixed|DTMG':         { file: 'mandalore/Mixed.ts', array: 'mandaloreDTMG' },
    'Mandalore|LS|combat top':      { file: 'mandalore/Mixed.ts', array: 'mandaloreGeneric' },
    'Mandalore|LS|Top Right':       { file: 'mandalore/Mixed.ts', array: 'mandaloreGeneric' },
};

function inferGameplay(notes) {
    const lower = notes.toLowerCase();
    let difficulty = 'difficulty.EASY';
    let successRate = 'successRate.CONSISTENT';
    let interactionType = '[interactionType.AUTO]';
    
    if (lower.includes('no auto') || lower.includes('cannot auto') || lower.includes('cant auto') || lower.includes("can't auto")) {
        difficulty = 'difficulty.NO_AUTO';
        interactionType = '[interactionType.MANUAL]';
    } else if (lower.includes('manual') && !lower.includes('full auto') && !lower.includes('autoable')) {
        if (lower.includes('auto') || lower.includes('autoable')) {
            difficulty = 'difficulty.CAUTION';
            interactionType = '[interactionType.AUTO]';
        } else {
            difficulty = 'difficulty.NO_AUTO';
            interactionType = '[interactionType.MANUAL]';
        }
    }
    
    if (lower.includes('100%') || lower.includes('100 %')) {
        successRate = 'successRate.CONSISTENT';
    } else if (lower.includes('inconsistent') || lower.includes('hit or miss') || lower.includes('50/50') || lower.includes('fifty')) {
        successRate = 'successRate.FIFTY_FIFTY';
    } else if (lower.includes('usually') || lower.includes('most of the time')) {
        successRate = 'successRate.USUALLY';
    } else if (lower.includes('unreliable') || lower.includes('sometimes')) {
        successRate = 'successRate.UNRELIABLE';
    } else if (lower.includes('ninety') || lower.includes('90%') || lower.includes('90 %')) {
        successRate = 'successRate.NINETY_PERCENT';
    } else if (lower.includes('1/2') && !lower.includes('2/2')) {
        successRate = 'successRate.FIFTY_FIFTY';
    }
    
    if (lower.includes('target') && (lower.includes('start') || lower.includes('first'))) {
        interactionType = '[interactionType.TARGET_START]';
    }
    if (lower.includes('pause') && lower.includes('wave')) {
        interactionType = '[interactionType.PAUSE_WAVE2]';
    }
    
    let omi = null;
    if (lower.includes('omi ') || lower.includes('omicron') || lower.includes('omi.')) {
        omi = true;
    }
    
    return { difficulty, successRate, interactionType, omi };
}

// Read all existing data files to build lead index per array
function readExistingLeads() {
    const existingLeads = {};
    
    function scanDir(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                scanDir(fullPath);
            } else if (entry.name.endsWith('.ts')) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                const arrayRegex = /export const (\w+)(?:\s*:\s*\w+(?:\[\])?\s*)?\s*=\s*\[/g;
                let m;
                const relativePath = path.relative(DATA_DIR, fullPath).replace(/\\/g, '/');
                while ((m = arrayRegex.exec(content)) !== null) {
                    const arrayName = m[1];
                    const key = `${relativePath}::${arrayName}`;
                    if (!existingLeads[key]) existingLeads[key] = new Set();
                    
                    const arrayStart = m.index + m[0].length;
                    const arrayContent = content.slice(arrayStart);
                    // Match single-quoted leads: lead: 'Name'
                    const leadRegex = /lead:\s*'([^']+)'/g;
                    let lm;
                    while ((lm = leadRegex.exec(arrayContent)) !== null) {
                        let closeBracket = arrayContent.indexOf('];', lm.index);
                        if (closeBracket === -1) closeBracket = arrayContent.indexOf(']', lm.index);
                        const nextExport = arrayContent.indexOf('\nexport const', lm.index);
                        if (closeBracket !== -1 && (nextExport === -1 || closeBracket < nextExport)) {
                            if (lm.index < closeBracket) {
                                existingLeads[key].add(lm[1].toLowerCase());
                            }
                        }
                    }
                    // Also match double-quoted leads: "lead": "Name"
                    const dqLeadRegex = /"lead":\s*"([^"]+)"/g;
                    while ((lm = dqLeadRegex.exec(arrayContent)) !== null) {
                        let closeBracket = arrayContent.indexOf('];', lm.index);
                        if (closeBracket === -1) closeBracket = arrayContent.indexOf(']', lm.index);
                        const nextExport = arrayContent.indexOf('\nexport const', lm.index);
                        if (closeBracket !== -1 && (nextExport === -1 || closeBracket < nextExport)) {
                            if (lm.index < closeBracket) {
                                existingLeads[key].add(lm[1].toLowerCase());
                            }
                        }
                    }
                }
            }
        }
    }
    
    scanDir(DATA_DIR);
    return existingLeads;
}

const existingLeads = readExistingLeads();

// Process suggestions
const generatedEntries = {};
let totalNew = 0;
let totalDupes = 0;
let totalUnmapped = 0;

for (const s of suggestions) {
    const key = `${s.phase}|${s.alignment}|${s.position}`;
    const mapping = POSITION_MAP[key];
    
    if (!mapping) {
        console.log(`UNMAPPED: ${key} - Lead: ${s.lead}`);
        totalUnmapped++;
        continue;
    }
    
    const leadLower = (s.lead || '').toLowerCase().trim();
    const dupKey = `${mapping.file}::${mapping.array}`;
    
    if (existingLeads[dupKey] && existingLeads[dupKey].has(leadLower)) {
        console.log(`DUPLICATE: ${key} - Lead: ${s.lead} already in ${dupKey}`);
        totalDupes++;
        continue;
    }
    
    if (!generatedEntries[dupKey]) generatedEntries[dupKey] = [];
    const alreadyGenerated = generatedEntries[dupKey].some(e => e.lead.toLowerCase() === leadLower);
    if (alreadyGenerated) {
        totalDupes++;
        continue;
    }
    
    const { difficulty, successRate, interactionType, omi } = inferGameplay(s.notes || '');
    
    let videosStr = '[]';
    if (s.videos && s.videos.length > 0) {
        videosStr = '[' + s.videos.map(url => `{ url: '${url}' }`).join(', ') + ']';
    }
    
    let creatorStr = '';
    if (s.creator && s.creator !== 'anonymous') {
        creatorStr = `,\n    creator: '${s.creator}'`;
    } else {
        creatorStr = `,\n    creator: 'anonymous'`;
    }
    
    let omiStr = '';
    if (omi) {
        omiStr = `,\n    omi: true`;
    }
    
    let cleanNotes = (s.notes || '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/=E2=80=99/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
    if (cleanNotes.endsWith(',')) cleanNotes = cleanNotes.slice(0, -1);
    
    let cleanLead = (s.lead || '').replace(/=E2=80=99/g, "'").trim();
    let cleanOthers = (s.others || '').replace(/=E2=80=99/g, "'").trim();
    
    const entry = `{
    lead: '${cleanLead.replace(/'/g, "\\'")}',
    others: '${cleanOthers.replace(/'/g, "\\'")}',
    notes: '${cleanNotes.replace(/'/g, "\\'")}',
    videos: ${videosStr},
    difficulty: ${difficulty},
    successRate: ${successRate},
    interactionType: ${interactionType}${creatorStr}${omiStr}
}`;
    
    generatedEntries[dupKey].push({
        lead: cleanLead,
        entry,
        key,
        creator: s.creator,
    });
    
    totalNew++;
    if (!existingLeads[dupKey]) existingLeads[dupKey] = new Set();
    existingLeads[dupKey].add(leadLower);
}

console.log(`\n=== Summary ===`);
console.log(`Total suggestions: ${suggestions.length}`);
console.log(`New entries: ${totalNew}`);
console.log(`Duplicates: ${totalDupes}`);
console.log(`Unmapped: ${totalUnmapped}`);

// Group by file
const byFile = {};
for (const [dupKey, entries] of Object.entries(generatedEntries)) {
    const [file, array] = dupKey.split('::');
    if (!byFile[file]) byFile[file] = {};
    byFile[file][array] = entries;
}

for (const [file, arrays] of Object.entries(byFile)) {
    console.log(`\n=== ${file} ===`);
    for (const [array, entries] of Object.entries(arrays)) {
        console.log(`  ${array}: ${entries.length} new entries`);
        for (const e of entries) {
            console.log(`    Lead: ${e.lead} (${e.key})`);
        }
    }
}

// Apply entries to files using a safer approach
console.log('\n=== Applying entries to files ===');
for (const [file, arrays] of Object.entries(byFile)) {
    const filePath = path.join(DATA_DIR, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    for (const [array, entries] of Object.entries(arrays)) {
        const newEntriesStr = entries.map(e => e.entry).join(',\n');
        
        // Find the closing ]; for this specific array
        // Use a more targeted regex that captures the exact array
        const arrayStartRegex = new RegExp(`export const ${array}(?:\\s*:\\s*\\w+(?:\\[\\])?\\s*)?\\s*=\\s*\\[`);
        const match = content.match(arrayStartRegex);
        if (!match) {
            console.log(`  WARNING: Could not find array ${array} in ${file}`);
            continue;
        }
        
        // Find the matching closing ]; for this array
        const startIdx = match.index + match[0].length;
        let depth = 1;
        let endIdx = startIdx;
        for (let i = startIdx; i < content.length; i++) {
            if (content[i] === '[') depth++;
            else if (content[i] === ']') {
                depth--;
                if (depth === 0) {
                    endIdx = i;
                    break;
                }
            }
        }
        
        // Check if the last entry before ]; ends with comma
        const before = content.slice(0, endIdx);
        const trimmedBefore = before.trimEnd();
        const separator = trimmedBefore.endsWith(',') ? '\n' : ',\n';
        
        // Insert new entries
        content = content.slice(0, endIdx) + separator + newEntriesStr + '\n' + content.slice(endIdx);
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${file}`);
}

console.log('\nDone!');
