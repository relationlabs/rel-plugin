import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from './friendHandle.did.js';
export { idlFactory } from './friendHandle.did.js';
// CANISTER_ID is replaced by webpack based on node environment

/**
 * 
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./friendHandle.did.js")._SERVICE>}
 */
 export const createFriendActor = (canisterId, options) => {
  const agent = new HttpAgent({ ...options?.agentOptions });

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};

