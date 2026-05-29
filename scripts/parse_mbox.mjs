import fs from 'fs';

const mboxPath = 'C:/Users/choco/Downloads/takeout-20260529T153911Z-3-001/Takeout/Mail/swgoh suggestions.mbox';
let content = fs.readFileSync(mboxPath, 'utf-8');

// Normalize line endings
content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

// Split into individual emails using the mbox "From " separator
// First email doesn't have leading \n but subsequent ones do
const parts = content.split(/\nFrom \d+@xxx /);
const emails = parts.filter(e => e.trim());

console.log(`Found ${emails.length} email parts`);

const suggestions = [];

for (const email of emails) {
    // Extract subject
    const subjectMatch = email.match(/^Subject: \[SWGOH RoTE\] New Team Suggestion: (.+)$/m);
    if (!subjectMatch) {
        // Skip non-suggestion emails (first part is headers)
        continue;
    }
    
    // Extract body (after the headers, look for the text/plain body)
    const bodyStart = email.indexOf('\n\nNew Team Suggestion Received!');
    if (bodyStart === -1) continue;
    const body = email.slice(bodyStart);

    // Parse mission details
    const phaseMatch = body.match(/- Phase: (.+)/);
    const alignmentMatch = body.match(/- Alignment: (.+)/);
    const positionMatch = body.match(/- Position: (.+)/);
    const leadMatch = body.match(/- Lead: (.+)/);
    const othersMatch = body.match(/- Others: (.+)/);
    const notesMatch = body.match(/- Notes: (.+)/);
    
    // Extract submitted by
    const submittedMatch = body.match(/Submitted by: (.+)/);
    let creator = null;
    let submitterEmail = null;
    if (submittedMatch) {
        const raw = submittedMatch[1].trim();
        if (raw.toLowerCase() === 'anonymous' || raw.toLowerCase().startsWith('anonymous')) {
            creator = 'anonymous';
        } else {
            // Parse "Name (email)" format
            const nameMatch = raw.match(/^(.+?)\s*\((.+@.+)\)$/);
            if (nameMatch) {
                creator = nameMatch[1].trim();
                submitterEmail = nameMatch[2].trim();
            } else {
                creator = raw;
            }
        }
    }
    
    // Extract video URLs
    const videoUrls = [];
    const urlRegex = /https?:\/\/youtu[^\s)\]]+/g;
    let m;
    while ((m = urlRegex.exec(body)) !== null) {
        videoUrls.push(m[0]);
    }
    
    // Also check notes for URLs
    const notesText = notesMatch ? notesMatch[1] : '';
    const urlRegex2 = /https?:\/\/youtu[^\s)\]]+/g;
    while ((m = urlRegex2.exec(notesText)) !== null) {
        if (!videoUrls.includes(m[0])) {
            videoUrls.push(m[0]);
        }
    }

    suggestions.push({
        subject: subjectMatch[1].trim(),
        phase: phaseMatch ? phaseMatch[1].trim() : null,
        alignment: alignmentMatch ? alignmentMatch[1].trim() : null,
        position: positionMatch ? positionMatch[1].trim() : null,
        lead: leadMatch ? leadMatch[1].trim() : null,
        others: othersMatch ? othersMatch[1].trim() : null,
        notes: notesMatch ? notesMatch[1].trim() : null,
        creator,
        submitterEmail,
        videos: videoUrls,
    });
}

console.log(`Total suggestions parsed: ${suggestions.length}`);

// Write to JSON for inspection
fs.writeFileSync('C:/repos/rote_nuxt/rote-nuxt/scripts/parsed_suggestions.json', JSON.stringify(suggestions, null, 2));

// Print summary grouped by phase+alignment+position
const grouped = {};
for (const s of suggestions) {
    const key = `${s.phase}|${s.alignment}|${s.position}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(s);
}

console.log('\n=== Grouped by Phase|Alignment|Position ===');
for (const [key, items] of Object.entries(grouped).sort()) {
    console.log(`\n${key} (${items.length} suggestions):`);
    for (const item of items) {
        console.log(`  Lead: ${item.lead} | Others: ${item.others?.slice(0, 60)}... | Notes: ${item.notes?.slice(0, 50)}...`);
        if (item.creator) console.log(`    Creator: ${item.creator}`);
        if (item.videos.length > 0) console.log(`    Videos: ${item.videos.join(', ')}`);
    }
}
