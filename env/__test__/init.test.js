/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from "path";
import { jest } from "@jest/globals";

beforeAll(() => {
  jest.unstable_mockModule("../utils.js", () => {
    return {
      getEnvPath: jest.fn(() => {}),
    };
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

// case success
test("should call getEnvPath function", async () => {
  const { getEnvPath } = await import("../utils.js");
  const { default: env } = await import("../index.js");

  getEnvPath.mockReturnValueOnce("./functions/../.env.function");

  const customEnvPaths = [{ dir: "functions", envFileName: ".env.functions" }];
  const customRoot = path.resolve() + "/functions";

  env.init(customEnvPaths, customRoot);

  expect(getEnvPath).toHaveBeenCalled();
});

// case error
test("should throw error", async () => {
  const { getEnvPath } = await import("../utils.js");
  const { default: env } = await import("../index.js");

  getEnvPath.mockImplementationOnce(() => {
    throw new Error("invalid option");
  });

  const customEnvPaths = [{ dir: "functions", envFileName: ".env.functions" }];
  const customRoot = path.resolve() + "/functions";

  expect(() => {
    env.init(customEnvPaths, customRoot);
  }).toThrow("Error setting environments");

  expect(getEnvPath).toHaveBeenCalled();
});
