import { defineBackend } from "@aws-amplify/backend";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { data } from "./data/resource";
import { voteHandler } from "./functions/vote-handler/resource";
import { voteAggregator } from "./functions/vote-aggregator/resource";

/**
 * Amplify Gen 2 Backend Definition
 *
 * Resources defined here are deployed to your personal cloud sandbox
 * with `npx amplify sandbox`, and to production/staging via git-branch
 * deployments in the Amplify Console.
 *
 * Learn more: https://docs.amplify.aws/gen2/
 */
const backend = defineBackend({
  data,
  voteHandler,
  voteAggregator,
});

// ── Grant the vote-handler Lambda access to the data tables ──
const voteDataSource = backend.data.resources.graphqlApi;
// The Lambda will interact with DynamoDB via AppSync resolvers

// ── Vote aggregator: table access + nightly schedule ──
const { tables } = backend.data.resources;
const aggregatorLambda = backend.voteAggregator.resources.lambda;

tables.TeamVote.grantReadData(aggregatorLambda);
tables.VoteSummary.grantReadWriteData(aggregatorLambda);
(aggregatorLambda as lambda.Function).addEnvironment(
  "TEAMVOTE_TABLE",
  tables.TeamVote.tableName
);
(aggregatorLambda as lambda.Function).addEnvironment(
  "VOTESUMMARY_TABLE",
  tables.VoteSummary.tableName
);

// Nightly at 05:00 UTC (~1am ET)
new events.Rule(backend.stack, "VoteAggregatorSchedule", {
  schedule: events.Schedule.cron({ minute: "0", hour: "5" }),
  targets: [new targets.LambdaFunction(aggregatorLambda)],
});

export default backend;
