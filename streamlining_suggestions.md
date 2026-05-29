# Streamlining Team Suggestions in swgoh-rote-auto

This document records the analyzed architecture and rules for parsing "Suggest a Team" email submissions.

## Target Arrays & Mappings

* **Phase 1 DS**: [data/p1/DS.ts](data/p1/DS.ts) $\to$ `shipsDSP1`, `leftDSP1`, etc.
* **Phase 2-6**: Under `data/p[2-6]/` matching the alignment and zone.

## Automated Bulk Processing

For batch importing suggestions from Gmail Takeout `.mbox` exports, two scripts are available:

### `scripts/parse_mbox.mjs`
Parses an `.mbox` file and extracts all team suggestion emails into a structured JSON file (`scripts/parsed_suggestions.json`). Usage:
```bash
node scripts/parse_mbox.mjs
```
Update the `mboxPath` variable to point at your `.mbox` file before running.

### `scripts/implement_suggestions.mjs`
Reads the parsed JSON, maps each suggestion to the correct data file and array, checks for duplicates against existing entries, infers `difficulty`/`successRate`/`interactionType` from the notes, and inserts new entries directly into the TypeScript data files.

**Key behaviors:**
- **Duplicate detection**: Matches leads case-insensitively across both single-quoted (`lead: '...'`) and double-quoted (`"lead": "..."`) formats.
- **Position mapping**: A static `POSITION_MAP` in the script maps email `Phase|Alignment|Position` strings to `{ file, array }` targets. New positions must be added here.
- **Gameplay inference**: Heuristic rules in `inferGameplay()` extract difficulty and successRate from notes text (e.g., "auto" → EASY/CONSISTENT, "1/2" → FIFTY_FIFTY, "no auto" → NO_AUTO/MANUAL).
- **Creator handling**: Named submitters get `creator: 'Name'`; anonymous submissions get `creator: 'anonymous'`; and `omi: true` is added when omicrons are mentioned.

**Edge cases the script handles:**
- Some pre-existing data files use JSON-style `"lead": "Name"` properties — these are detected alongside the standard `lead: 'Name'` format.
- Some arrays close with `]` instead of `];` — the bracket-matching logic handles both.
- Quoted-printable encoding (`=C3=A9` → `é`, `=E2=80=99` → `'`) is decoded automatically.
- Typos in lead names (e.g., "Grand Inquistor" vs "Grand Inquisitor") are **not** caught by the duplicate check — review the output for near-duplicates after running.

### Parsing Instructions for AI Assistant (Run on demand)
When requested to parse a team suggestion email, use the following rules:

1. **Verify Source**: Look at `Phase`, `Alignment`, and `Position` to find the correct file and array.
2. **Duplicate Check**: Verify if the `lead` character/ship already exists in the target array. If it does, alert the user rather than inserting.
3. **Form JSON / TypeScript Object**:
   * **lead**: The submitted lead character/ship name.
   * **others**: The submitted list of other characters/ships.
   * **notes**: The description/notes.
   * **videos**: Extract URLs if provided, or leave as empty array `[]`.
   * **icon**: Find a matching icon path from `public/icons/characters/` or `public/icons/ships/`.
   * **difficulty**: Map to `difficulty` enum:
     * "no auto" $\to$ `difficulty.NO_AUTO`
     * "caution" $\to$ `difficulty.CAUTION`
     * "hard" $\to$ `difficulty.HARD`
     * "easy" $\to$ `difficulty.EASY`
     * "very easy" $\to$ `difficulty.VERY_EASY`
   * **successRate**: Map to `successRate` enum (`CONSISTENT`, `NINETY_PERCENT`, `USUALLY`, `FIFTY_FIFTY`, `UNRELIABLE`).
   * **interactionType**: Map to array of `interactionType` enums:
     * "no auto" $\to$ `[interactionType.MANUAL]`
     * "pause at wave 2" $\to$ `[interactionType.PAUSE_WAVE2]`
     * "target at start" $\to$ `[interactionType.TARGET_START]`
     * Default to `[interactionType.AUTO]` if pure auto.
   * **creator**: Map to `Submitted by` field (e.g., "Anonymous (william.volny85@gmail.com)").
4. **Update and Verify**:
   * Append the new object to the target array.
   * Ensure imports/exports are correct and the application builds.
