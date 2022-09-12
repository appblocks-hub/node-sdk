/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getDynamicImport } from "../utils.js";

test("should throw error invalid path ", () => {
  expect(async () => {
    await getDynamicImport();
  }).rejects.toEqual("invalid path");
});

// test("should import ", () => {
//   expect(async () => {
//     await getDynamicImport("../index.js");
//   }).toResolve();
// });
