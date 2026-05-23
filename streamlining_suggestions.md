# Streamlining Team Suggestions in swgoh-rote-auto

This document records the analyzed architecture and rules for parsing "Suggest a Team" email submissions.

## Target Arrays & Mappings

* **Phase 1 DS**: [data/p1/DS.ts](file:///C:/Users/choco/repos/swgoh-rote-auto/data/p1/DS.ts) $\to$ `shipsDSP1`, `leftDSP1`, etc.
* **Phase 2-6**: Under `data/p[2-6]/` matching the alignment and zone.

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
