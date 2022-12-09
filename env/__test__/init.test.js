/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import dotenv from "dotenv";
import path from "path";
import { jest } from "@jest/globals";
import config from "../../config/index.js";

afterEach(() => {
  jest.restoreAllMocks();
});

// case success
test("should call env with custom path", async () => {
  const { default: env } = await import("../index.js");
  const dotenvSpy = jest.spyOn(dotenv, "config");
  const customPath = path.join(path.resolve(), "/.env");
  env.init(customPath);
  expect(dotenvSpy).toHaveBeenCalledWith({ path: customPath });
});

// case success
test("should call env with parent path", async () => {
  const { default: env } = await import("../index.js");

  const parentPath = "/home/test/";
  const emulatorPath = `${parentPath}/${config.EMULATOR_FOLDER_NAME}`;
  jest.spyOn(path, "resolve").mockReturnValue(emulatorPath);
  const dotenvSpy = jest.spyOn(dotenv, "config");
  process.env.parentPath = parentPath;
  env.init();
  expect(dotenvSpy).toHaveBeenCalledWith({ path: `/home/test/.env.function` });
});
