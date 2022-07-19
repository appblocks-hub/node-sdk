/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from "path";

// Path to shared directory
const getSharedPath = (options) => {
  const { dir, sharedFolder, relative } = options;

  const currentDir = `${relative}/`
    .split(dir)[1]
    ?.replace(/(?<=\/)(.*?)(?=\/)/g, "..");

  return `${relative}${currentDir || ""}../${sharedFolder}`;
};

const getShared = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let relative = path.resolve();
      let sharedFolderPath = `${relative}/shared-fns/index.js`;

      const dirPaths = [
        {
          dir: "functions",
          sharedFolder: "functions/shared-fns/index.js",
        },
        {
          dir: "._ab_em",
          sharedFolder: "functions/shared-fns/index.js",
        },
      ];

      for await (const pathData of dirPaths) {
        if (sharedFolderPath.includes(`/${pathData.dir}`)) {
          sharedFolderPath = getSharedPath({ ...pathData, relative });
          const sharedData = await import(sharedFolderPath);
          return resolve(sharedData.default);
        }
      }

      // For testing read shared folder in relative path
      const testSharedData = await import(sharedFolderPath);
      return resolve(testSharedData.default);
    } catch (error) {
      reject(error);
    }
  });
};

export default { getShared };
