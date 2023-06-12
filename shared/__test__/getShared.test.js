/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import path from "path";
import fs from "fs";
import { jest } from "@jest/globals";
import config from "../../config/index.js";

test("should return empty object", async () => {
  const { default: shared } = await import("../index.js");
  const sharedFunctions = await shared.getShared();
  expect(sharedFunctions).toEqual({});
});

test("should resolve custom passed path functions", async () => {
  const customDirectoryPaths = [
    `${path.resolve()}/examples/shared-example/sample_utils`,
  ];
  const { default: shared } = await import("../index.js");
  const sharedFunctions = await shared.getShared(customDirectoryPaths);
  expect(sharedFunctions).toEqual({
    sharedSampleValue: "Sample constant value",
  });
});

test("should get shared data from parent path as root", async () => {
  const { default: shared } = await import("../index.js");

  const parentPath = path.resolve();
  process.env.parentPath = parentPath;

  const emulatorPath = `${parentPath}/${config.EMULATOR_FOLDER_NAME}`;
  jest.spyOn(path, "resolve").mockResolvedValueOnce(emulatorPath);
  jest.spyOn(fs, "existsSync").mockReturnValue(true);
  jest
    .spyOn(fs, "readFileSync")
    .mockReturnValue(
      '{"dependencies":{"sample_utils":{"directory":"/examples/shared-example/sample_utils"}}}'
    );

  const sharedFunctions = await shared.getShared();
  expect(sharedFunctions).toEqual({
    sharedSampleValue: "Sample constant value",
  });
});

test("should get throw error on invalid path", async () => {
  const customDirectoryPaths = [`/home/test/non_existing_path`];
  const { default: shared } = await import("../index.js");
  expect(async () => {
    await shared.getShared(customDirectoryPaths);
  }).rejects;
});
