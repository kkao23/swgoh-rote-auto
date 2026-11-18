// Source of truth for the standalone `swgoh-rote-maintainer-apply` Lambda
// (deployed outside Amplify; sibling of suggest-team.mjs, same SES intake).
//
// Receives maintainer applications from pages/join.vue and emails them to the
// same address as the suggest-a-team flow.
//
// Deploy (fresh account):
//   1. Create an execution role with AWSLambdaBasicExecutionRole + ses:SendEmail
//      on arn:aws:ses:us-east-1:<account>:identity/<recipient email>
//   2. zip maintainer-apply.mjs && aws lambda create-function \
//        --function-name swgoh-rote-maintainer-apply --runtime nodejs24.x \
//        --role <role-arn> --handler maintainer-apply.handler \
//        --zip-file fileb://maintainer-apply.zip --region us-east-2
//   3. On HTTP API swgoh-rote-api (47rezenqn0): create routes
//      POST /maintainer-apply + OPTIONS /maintainer-apply → AWS_PROXY integration
//   4. aws lambda add-permission ... --source-arn \
//        arn:aws:execute-api:us-east-2:<account>:47rezenqn0/*/POST/maintainer-apply
// Update:
//   aws lambda update-function-code --function-name swgoh-rote-maintainer-apply \
//     --zip-file fileb://maintainer-apply.zip --region us-east-2
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "us-east-1" });
const YOUR_EMAIL = "chocomog@gmail.com";

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
    const { name, discord, allyCode, why, userEmail, website } = body;

    // Honeypot: bots fill the hidden "website" field; humans never see it.
    // Pretend success so bots don't learn anything.
    if (website) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: "Application received" })
      };
    }

    if (!name || !discord || !why) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Missing required fields" })
      };
    }

    const sourceIp = event.requestContext?.http?.sourceIp || "unknown";
    const receivedAt = new Date().toISOString();

    const emailParams = {
      Source: YOUR_EMAIL,
      Destination: { ToAddresses: [YOUR_EMAIL] },
      Message: {
        Subject: {
          Data: `[SWGOH RoTE] Maintainer Application: ${String(name).slice(0, 60)}`
        },
        Body: {
          Text: {
            Data: `
New Maintainer Application Received!
-------------------------------------
Name:         ${name}
Best contact: ${discord}
Ally Code:    ${allyCode || "(not provided)"}
Email:        ${userEmail || "(not provided)"}

Why they're interested / relevant experience:
${why}

-------------------------------------
Submitted: ${receivedAt}
Source IP: ${sourceIp}
`
          }
        }
      }
    };

    await ses.send(new SendEmailCommand(emailParams));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: "Application received" })
    };
  } catch (error) {
    console.error("Application error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Failed to submit application" })
    };
  }
};
