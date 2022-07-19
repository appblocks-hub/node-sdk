/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Initializes the yah config data
 * @param {*} config
 */
const initialize = (config) => {
  if (config == null) {
    throw new Error("Yahilo app intitialiation failed! No config passed");
  }else if (config.clientId && config.clientSecret) {
    global.YahConfig = config;
    return true
  }
  
  throw new Error("Yahilo app intitialiation failed! Invalid config passed");
};

export default { initialize };
