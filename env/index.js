/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import dotenv from "dotenv";
import path from "path";
import { getEnvPath } from "./utils.js";

const defaultEnvPaths = [
  {
    dir: "functions",
    envFileName: ".env.function",
  },
  {
    dir: "._ab_em",
    envFileName: ".env.function",
  },
  {
    dir: "view",
    envFileName: ".env.view",
  },
];

// Setup environment
const init = (customEnvPaths, customRoot) => {
  try {
    let envPaths = customEnvPaths || defaultEnvPaths;
    let relative = customRoot || path.resolve();
    let envPath = `${relative}/.env`;

    for (const pathData of envPaths) {
      if (!envPath.includes(`/${pathData.dir}`)) continue;
      envPath = getEnvPath({ ...pathData, relative });
      break;
    }

    dotenv.config({ path: envPath });
  } catch (error) {
    throw new Error("Error setting environments");
  }
};

export default { init };
