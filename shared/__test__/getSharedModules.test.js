/**
 * Copyright (c)  Yahilo. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { jest } from "@jest/globals";
import fs from "fs";

jest.mock("fs")

beforeAll(() => {
  jest.unstable_mockModule("../utils.js", () => {
    return {
      getSharedDirectoryPath: jest.fn(),
      getSharedPath: jest.fn(),
      getDynamicImport: jest.fn(),
    };
  });

  fs.readdirSync = jest.fn();
});

afterAll(() => {
  jest.clearAllMocks();
});

const VALIDFILES = [];
const customOptions = { sharedDir: "../examples/shared-fns" };

test("should call getSharedDirectoryPath", async () => {
  const { getSharedDirectoryPath } = await import("../utils.js");
  const { default: shared } = await import("../index.js");

  fs.readdirSync.mockReturnValue(VALIDFILES);

  await shared.getSharedModules(customOptions);

  expect(getSharedDirectoryPath).toHaveBeenCalled();
});

test("should reject error while calling get shared directory path on invalid option", async () => {
  const { getSharedDirectoryPath } = await import("../utils.js");
  const { default: shared } = await import("../index.js");

  getSharedDirectoryPath.mockImplementationOnce(() => {
    throw new Error("invalid option");
  });

  fs.readdirSync.mockReturnValue(VALIDFILES);

  expect(async () => {
    await shared.getSharedModules(customOptions);
  }).rejects.toThrow("invalid option");

  expect(getSharedDirectoryPath).toHaveBeenCalled();
});
