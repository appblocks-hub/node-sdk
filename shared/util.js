/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { existsSync, readFileSync } from "fs";
import path from "path";
import config from "../config/index.js";

const { BLOCK_TYPES, BLOCK_CONFIG_FILE_NAME } = config;

/**
 *
 * @param {import('fs').PathLike} s
 * @returns {Promise<{data:object,err:Error}>}
 */
async function readJsonAsync(path) {
  if (typeof path !== "string") return { data: null, err: true };
  try {
    const file = readFileSync(path);
    const data = JSON.parse(file);
    return { data, err: null };
  } catch (err) {
    return { data: null, err };
  }
}

const getAllLevelSharedBlocks = async ({
  parentPathValue,
  dependencies,
  sharedBlocks,
}) => {
  if (!dependencies) return sharedBlocks;

  const depValues = Object.values(dependencies);
  if (!depValues?.length) return sharedBlocks;

  await Promise.allSettled(
    depValues.map(async (dep) => {
      const blockAbsolutePath = path.join(parentPathValue, dep.directory);
      const { data, err } = await readJsonAsync(
        path.join(blockAbsolutePath, BLOCK_CONFIG_FILE_NAME)
      );

      if (err) console.log(err);

      if (data.type === BLOCK_TYPES.PACKAGE) {
        await getAllLevelSharedBlocks({
          parentPathValue: blockAbsolutePath,
          dependencies: data.dependencies,
          sharedBlocks,
        });
      } else if (data.type === BLOCK_TYPES.SHARED_FUNCTION) {
        sharedBlocks.push(blockAbsolutePath);
      }

      return true;
    })
  );

  return sharedBlocks;
};

const getSharedBlocks = async (parentPathValue) => {
  const configPath = path.join(parentPathValue, BLOCK_CONFIG_FILE_NAME);
  if (!existsSync(configPath)) return [];

  const blockConfig = JSON.parse(readFileSync(configPath));

  const sharedBlocks = await getAllLevelSharedBlocks({
    parentPathValue,
    dependencies: blockConfig.dependencies,
    sharedBlocks: [],
  });

  return sharedBlocks;
};

export { getSharedBlocks };
