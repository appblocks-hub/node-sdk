/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
 import { getSharedDirectoryPath } from "../utils.js";

 test("should return shared directory path", () => {
   const output = "../examples/shared-fns";
   const result = getSharedDirectoryPath({sharedDir:"../examples/shared-fns"});
   expect(result).toBe(output);
 });
 
 test("should throw error invalid option", () => {
   expect(() => {
     getSharedDirectoryPath();
   }).toThrow("invalid option");
 });