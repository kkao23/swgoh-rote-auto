import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

/**
 * Amplify Gen 2 client-side plugin.
 *
 * Configures the Amplify JS library with the sandbox backend outputs
 * (AppSync endpoint, API key, region, data schema).
 *
 * This plugin runs only on the client because Amplify requires
 * browser APIs (localStorage, etc.).
 */
export default defineNuxtPlugin(() => {
  Amplify.configure(outputs);
});
