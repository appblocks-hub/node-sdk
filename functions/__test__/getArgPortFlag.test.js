/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getArgPortFlag } from "../utils.js";

test("should return undefined", () => {
  const result = getArgPortFlag();
  expect(result).toBe(undefined);
});

test("should return port value from process arguments", () => {
  process.argv.push("--port=3000");
  const output = "3000";
  const result = getArgPortFlag();
  expect(result).toBe(output);
});
