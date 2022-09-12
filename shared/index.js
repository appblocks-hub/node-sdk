/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from "path";
import { getSharedPath, getDynamicImport } from "./utils.js";

const defaultSharedDirectory = [
  {
    dir: "functions",
    sharedFolder: "functions/shared-fns/index.js",
  },
  {
    dir: "._ab_em",
    sharedFolder: "functions/shared-fns/index.js",
  },
];

const getShared = (customSharedDirectory, customSharedFolderPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      let relative = path.resolve();
      let sharedFolderPath =
        customSharedFolderPath || path.join(relative, `/shared-fns/index.js`);

      const dirPaths = customSharedDirectory || defaultSharedDirectory;

      for await (const pathData of dirPaths) {
        if (sharedFolderPath.includes(`${pathData.dir}`)) {
          sharedFolderPath = getSharedPath({ ...pathData, relative });
          const sharedData = await getDynamicImport(sharedFolderPath);
          return resolve(sharedData);
        }
      }

      // For testing read shared folder in relative path
      const testSharedData = await getDynamicImport(sharedFolderPath);
      return resolve(testSharedData);
    } catch (error) {
      reject(error);
    }
  });
};

export default { getShared };
