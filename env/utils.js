/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { isEmptyObject } from "../utils.js";

// Path to root directory env
export const getEnvPath = (options) => {
  try {
    if (isEmptyObject(options)) {
      throw new Error("invalid option passed");
    }
    const { dir, envFileName, relative } = options;
    const root = `${relative}/`
      .split(dir)[1]
      .replace(/(?<=\/)(.*?)(?=\/)/g, "..");

    return `${relative}${root || ""}../${envFileName}`;
  } catch (error) {
    throw error;
  }
};
