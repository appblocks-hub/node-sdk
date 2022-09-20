/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getEnvPath } from "../utils.js";

// case success
test("should return env path", () => {
  const output = ".env.function";
  const result = getEnvPath({
    dir: "functions",
    envFileName: ".env.function",
    relative: "./functions",
  });
  expect(result).toBe(output);
});

test("should throw error invalid option passed", () => {
  expect(() => {
    getEnvPath();
  }).toThrow("invalid option passed");
});
