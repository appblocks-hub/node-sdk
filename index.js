/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import functions from "./functions/index.js";
import shield from "./shield/index.js";
import internals from "./internals/index.js";
import env from "./env/index.js";
import shared from "./shared/index.js";

const { run } = functions;
const { getUID, getUser } = shield;
const { initialize } = internals;
const { init: envInit } = env;
const { getShared,getSharedModules } = shared;

// For named export
export {
  functions,
  run,
  shield,
  getUID,
  getUser,
  internals,
  initialize,
  env,
  envInit,
  shared,
  getShared,
  getSharedModules
};

// For whole sdk default export
export default { functions, shield, internals, env };
