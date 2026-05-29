import { defineBackend } from "@aws-amplify/backend";
import { data } from "./data/resource";
import { voteHandler } from "./functions/vote-handler/resource";

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
});

// ── Grant the vote-handler Lambda access to the data tables ──
const voteDataSource = backend.data.resources.graphqlApi;
// The Lambda will interact with DynamoDB via AppSync resolvers

export default backend;
