/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from "path";
import fs from "fs";
import { pathToFileURL } from "url";
import { getSharedBlocks } from "./util.js";

import config from "../config/index.js";

const getShared = (customDirectoryPaths) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { BLOCK_CONFIG_FILE_NAME } = config;

      const parentPath = process.env.parentPath;
      const blockConfigFileName =
        process.env.BLOCK_CONFIG_FILE_NAME || BLOCK_CONFIG_FILE_NAME;

      let sharedDirectoryPaths = customDirectoryPaths;
      let sharedFunctions = {};
      const relativePath = path.resolve();

      if (!customDirectoryPaths) {
        let parentPathValue = parentPath;

        if (!parentPath) {
          const configPath = path.join(relativePath, blockConfigFileName);
          if (!fs.existsSync(configPath)) return resolve(sharedFunctions);
          const blockConfig = JSON.parse(fs.readFileSync(configPath));
          parentPathValue = blockConfig.directory
            ? relativePath.replace(blockConfig.directory, "")
            : relativePath;
        }

        sharedDirectoryPaths = await getSharedBlocks(parentPathValue);
      }

      if (sharedDirectoryPaths?.length < 1) return resolve(sharedFunctions);

      let impErrs = [];

      await Promise.allSettled(
        sharedDirectoryPaths.map(async (filePath) => {
          try {
            let indexFilePath = `${filePath}/index.js`;

            if (["win32", "win64"].includes(process.platform)) {
              indexFilePath = pathToFileURL(indexFilePath).href;
            }

            const module = await import(indexFilePath);
            sharedFunctions = { ...sharedFunctions, ...module.default };

            return true;
          } catch (err) {
            impErrs.push(err);
            return false;
          }
        })
      );

      if (impErrs.length > 0) throw impErrs;
      return resolve(sharedFunctions);
    } catch (error) {
      reject(error);
    }
  });
};

export default { getShared };
