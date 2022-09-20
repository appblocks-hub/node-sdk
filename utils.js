/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Check passed value is valid object
 * @param {*} value
 * @returns boolean
 */
export const isEmptyObject = (val) => {
  return (
    val == null ||
    typeof val !== "object" ||
    (typeof val === "object" && Object.keys(val).length === 0)
  );
};

/**
 * Check passed value is valid string
 * @param {*} value
 * @returns boolean
 */
export const isEmptyString = (val) => {
  return (
    val == null ||
    typeof val !== "string" ||
    (typeof val === "string" && val.length === 0)
  );
};

/**
 * Check passed value is valid function
 * @param {*} value
 * @returns boolean
 */
export const isValidFunction = (val) => {
  return !!(val && val instanceof Function);
};
