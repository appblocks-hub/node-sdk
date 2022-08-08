/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { getPort } from "../utils.js";

test("should return port value from enviroment for function env YAHILO_PROD_FUNCTION", async () => {
  process.env.FUNCTION_ENV = "YAHILO_PROD_FUNCTION";
  process.env.FUNCTION_PORT = 3000;
  const result = await getPort();
  expect(result).toBe("3000");
});

test("should return port value from arguments for function env ", async () => {
  process.argv.push("--port=3000");
  const result = await getPort();
  expect(result).toBe("3000");
});

// test("should return port value from YAHILO_EMULATOR_INITIALISED for function env ", async () => {
//   process.env.YAHILO_EMULATOR_INITIALISED = "INIT";
//   process.env.FUNCTION_PORT = "ports.yahilo.com";
//   const result = await getPort();
//   expect(result).toBe("3000");
// });
