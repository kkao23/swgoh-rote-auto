/**
 * Reads old submission emails from submission.txt and outputs
 * copy-pasteable JSON matching the `data` type from models/data.ts.
 *
 * Usage: npx tsx scripts/backfill_submissions.ts
 *
 * submission.txt should contain one or more raw email bodies.
 * Each submission block starts with "New Team Suggestion Received!"
 * and ends at the next such line or EOF.
 */

import * as fs from 'fs';
import { leads } from '../data/leads';

// ── Build lead-name → gameId lookup ──────────────────────────────
const leadToGameId = new Map<string, string>();
for (const l of leads) {
  leadToGameId.set(l.fullName.toLowerCase(), l.id);
  leadToGameId.set(l.id.toLowerCase(), l.id);
  for (const alias of l.aliases) {
    leadToGameId.set(alias.toLowerCase(), l.id);
  }
}

function matchGameId(leadText: string): string | undefined {
  return leadToGameId.get(leadText.trim().toLowerCase());
}

// ── Parse raw email body ─────────────────────────────────────────

interface ParsedSubmission {
  phase: string;
  alignment: string;
  position: string;
  lead: string;
  others: string;
  notes: string;
  submittedBy: string;
}

function parseBlock(block: string): ParsedSubmission | null {
  const get = (key: string): string => {
    const m = block.match(new RegExp(`- ${key}: (.+)`));
    return m ? m[1].trim() : '';
  };

  const submittedMatch = block.match(/Submitted by: (.+)/);
  const submittedBy = submittedMatch ? submittedMatch[1].trim() : '';

  const phase = get('Phase');
  const alignment = get('Alignment');
  const position = get('Position');
  const lead = get('Lead');
  const others = get('Others');
  const notes = get('Notes');

  if (!phase || !lead || !others || !notes) return null;
  return { phase, alignment, position, lead, others, notes, submittedBy };
}

// ── Main ─────────────────────────────────────────────────────────

const raw = fs.readFileSync('submission.txt', 'utf-8');

// Split on the header line, keep the content after it
const blocks = raw
  .split(/New Team Suggestion Received!/)
  .map(b => b.trim())
  .filter(Boolean);

const results: string[] = [];
let skipped = 0;

for (const block of blocks) {
  const parsed = parseBlock(block);
  if (!parsed) {
    skipped++;
    continue;
  }

  const gameId = matchGameId(parsed.lead);

  // Build the `data`-type JSON
  const teamData: Record<string, unknown> = {
    lead: parsed.lead,
    others: parsed.others,
    notes: parsed.notes,
    videos: [],
    difficulty: 'EASY', // verify before committing
  };
  if (gameId) teamData.gameId = gameId;

  results.push(
    [
      `// ── ${parsed.phase} ${parsed.alignment} ${parsed.position} ── ${parsed.submittedBy}`,
      JSON.stringify(teamData, null, 2),
    ].join('\n'),
  );
}

console.log(results.join('\n\n'));
console.error(`\n// Parsed ${results.length} submissions${skipped ? `, skipped ${skipped} invalid` : ''}`);
