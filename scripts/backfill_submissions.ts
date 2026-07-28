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
  name: string;
}

function parseBlock(block: string): ParsedSubmission | null {
  const get = (key: string): string => {
    const m = block.match(new RegExp(`- ${key}: (.+)`));
    return m ? m[1].trim() : '';
  };

  const submittedMatch = block.match(/Submitted by: (.+)/);
  const submittedBy = submittedMatch ? submittedMatch[1].trim() : '';
  // Extract just the name (before the email in parens)
  const nameMatch = submittedBy.match(/^([^(]+)/);
  const name = nameMatch ? nameMatch[1].trim() : submittedBy;

  const phase = get('Phase');
  const alignment = get('Alignment');
  const position = get('Position');
  const lead = get('Lead');
  const others = get('Others');
  const notes = get('Notes');

  if (!phase || !lead || !others || !notes) return null;
  return { phase, alignment, position, lead, others, notes, submittedBy, name };
}

// ── Format as TypeScript object literal ──────────────────────────

function formatTeamData(parsed: ParsedSubmission, gameId: string | undefined): string {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const creator = parsed.name || 'Anonymous';
  const lines: string[] = ['{'];
  lines.push(`  lead: '${esc(parsed.lead)}',`);
  if (gameId) lines.push(`  gameId: '${gameId}',`);
  lines.push(`  others: '${esc(parsed.others)}',`);
  lines.push(`  notes: '${esc(parsed.notes)}',`);
  lines.push(`  videos: [],`);
  lines.push(`  difficulty: difficulty.EASY,`);
  lines.push(`  creator: '${esc(creator)}',`);
  lines.push(`}`);
  return lines.join('\n');
}

// ── Main ─────────────────────────────────────────────────────────

const raw = fs.readFileSync('submission.txt', 'utf-8');

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

  results.push(
    [
      `// ── ${parsed.phase} ${parsed.alignment} ${parsed.position} ── ${parsed.submittedBy}`,
      formatTeamData(parsed, gameId),
    ].join('\n'),
  );
}

console.log(results.join('\n\n'));
console.error(`\n// Parsed ${results.length} submissions${skipped ? `, skipped ${skipped} invalid` : ''}`);
