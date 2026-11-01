// Source of truth for the standalone `swgoh-rote-suggest-team` Lambda
// (deployed outside Amplify; update via scripts/update-suggest-team.sh
// or aws lambda update-function-code).
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });
const YOUR_EMAIL = "chocomog@gmail.com";

// Escape for a single-quoted TypeScript string literal
const escapeTs = (s) =>
  s.replace(/\\/g, "\\\\").replace(/'/g, "\\'");

export const handler = async (event) => {
  console.log("Event:", JSON.stringify(event));

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { lead, others, notes, phase, alignment, position, userEmail, userName, gameId, duplicateLead } = body;

    if (!lead || !others || !notes || !phase || !alignment || !position) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    const sourceIp = event.requestContext?.http?.sourceIp || "unknown";

    // Extract YouTube links from the notes into the videos array
    const youtubeRegex =
      /https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/|live\/)|youtu\.be\/)[\w\-?=&.]+/gi;
    const videoUrls = [...new Set(notes.match(youtubeRegex) ?? [])];
    const cleanedNotes = notes
      .replace(youtubeRegex, "")
      .replace(/\s{2,}/g, " ")
      .trim()
      .replace(/[\s,;]+$/, "");

    const videos = videoUrls.map((url) => ({ url }));
    const creator = userEmail ? userName || userEmail : "anonymous";

    // Copy-pasteable snippet matching models/data.ts `data` type usage in
    // the data/<phase>/<Side>.ts files (single-quoted TS, difficulty enum)
    const videosSnippet = videos.length
      ? `[\n        { url: '${escapeTs(videos[0].url)}' },\n    ]`
      : "[]";
    const teamSnippet = `{
    lead: '${escapeTs(lead)}',
    others: '${escapeTs(others)}',
    notes: '${escapeTs(cleanedNotes)}',
    videos: ${videosSnippet},
    difficulty: difficulty.EASY,${gameId ? `\n    gameId: '${escapeTs(gameId)}',` : ""}
    creator: '${escapeTs(creator)}',
}`;

    const emailParams = {
      Source: YOUR_EMAIL,
      Destination: { ToAddresses: [YOUR_EMAIL] },
      Message: {
        Subject: {
          Data: `[SWGOH RoTE] New Team Suggestion: ${phase} ${alignment} ${position}`
        },
        Body: {
          Text: {
            Data: `
New Team Suggestion Received!
${duplicateLead ? `\n⚠️  DUPLICATE LEAD — "${lead}" already exists for ${phase} ${alignment} ${position}\n` : ""}
--- Copy-paste into data file ---
${teamSnippet}
---

Mission Details:
- Phase: ${phase}
- Alignment: ${alignment}
- Position: ${position}

${userEmail ? `Submitted by: ${userName || "Anonymous"} (${userEmail})` : "Submitted anonymously"}

Source IP: ${sourceIp}
Timestamp: ${new Date().toISOString()}
            `.trim()
          }
        }
      }
    };

    await ses.send(new SendEmailCommand(emailParams));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: "Team suggestion submitted successfully!"
      })
    };

  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to submit suggestion. Please try again."
      })
    };
  }
};
