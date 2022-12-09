/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import dotenv from "dotenv";
import { existsSync, readFileSync } from "fs";
import path from "path";

import config from "../config/index.js";

const init = (customPath) => {
  /**
   * Setup env if custom path is passed
   */
  if (customPath) {
    dotenv.config({ path: customPath });
    return;
  }

  const {
    EMULATOR_FOLDER_NAME,
    BLOCK_CONFIG_FILE_NAME,
    FUNCTION_ENV_FILE_NAME,
    VIEW_ENV_FILE_NAME,
    VIEW_BLOCK_TYPES,
  } = config;

  /**
   * Get env according to configuration
   */
  const parentPath = process.env.parentPath;
  const emFolder = process.env.EMULATOR_FOLDER_NAME || EMULATOR_FOLDER_NAME;
  const blockConfigFileName =
    process.env.BLOCK_CONFIG_FILE_NAME || BLOCK_CONFIG_FILE_NAME;
  const fnEnvFileName =
    process.env.FUNCTION_ENV_FILE_NAME || FUNCTION_ENV_FILE_NAME;
  const viewEnvFileName = process.env.VIEW_ENV_FILE_NAME || VIEW_ENV_FILE_NAME;
  const viewBlockTypes = process.env.VIEW_BLOCK_TYPES || VIEW_BLOCK_TYPES;

  const relative = path.resolve();
  let envPath = `${relative}/.env`;

  const blockConfigPath = path.join(relative, blockConfigFileName);

  if (relative.includes(emFolder)) {
    envPath = path.join(parentPath, fnEnvFileName);
  } else if (existsSync(blockConfigPath)) {
    const blockConfig = JSON.parse(readFileSync(blockConfigPath));
    const envFileName = viewBlockTypes.includes(blockConfig.type)
      ? viewEnvFileName
      : fnEnvFileName;

    envPath = path.join(
      parentPath || relative.replace(blockConfig.directory, ""),
      envFileName
    );
  }

  dotenv.config({ path: envPath });
};

export default { init };
