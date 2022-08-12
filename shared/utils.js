/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isEmptyObject, isEmptyString } from "../utils.js";

// Path to shared directory
export const getSharedPath = (options) => {
  try {
    if (isEmptyObject(options)) throw new Error("invalid option");

    const { dir, sharedFolder, relative } = options;

    const currentDir = `${relative}/`
      .split(dir)[1]
      ?.replace(/(?<=\/)(.*?)(?=\/)/g, "..");

    return `${relative}${currentDir ? currentDir + "../" : "/"}${sharedFolder}`;
  } catch (error) {
    throw error;
  }
};

export const getDynamicImport = async (sharedFolderPath) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isEmptyString(sharedFolderPath)) {
        reject("invalid path");
      }

      const sharedData = await import(sharedFolderPath);
      return resolve(sharedData.default);
    } catch (error) {
      reject(error);
    }
  });
};
