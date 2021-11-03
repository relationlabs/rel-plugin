import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from './relationship.did.js';
export { idlFactory } from './relationship.did.js';
// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = '4c55y-5qaaa-aaaai-aaxaa-cai';

/**
 * 
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./relationship.did.js.js")._SERVICE>}
 */
 export const createActor = (canisterId, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions });

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};
  
/**
 * A ready-to-use agent for the relationship canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./relationship.did.js.js")._SERVICE>}
 */
 export const relationship = createActor(canisterId, {
   agentOptions: {
     host: 'https://ic0.app',
   },
 });
