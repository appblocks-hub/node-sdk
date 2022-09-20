/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getSharedPath } from "../utils.js";

test("should return shared directory path", () => {
  const output = "functions/shared-fns/index.js";
  const result = getSharedPath({
    dir: "functions",
    sharedFolder: "functions/shared-fns/index.js",
    relative: ".",
  });
  expect(result).toBe(output);
});

test("should throw error invalid option", () => {
  expect(() => {
    getSharedPath();
  }).toThrow("invalid option");
});
