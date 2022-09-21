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
      getSharedDirectoryPath: jest.fn(),
    };
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

const customOptions = {sharedDir:"../examples/shared-fns"}

test("should call getSharedDirectoryPath and getDynamicImport", async () => {
  const { getSharedDirectoryPath} = await import("../utils.js");
  const { default: shared } = await import("../index.js");

  await shared.getSharedModules(customOptions);

  expect(getSharedDirectoryPath).toHaveBeenCalled();
});

test("should reject error on invalid option", async () => {
  const { getSharedDirectoryPath } = await import("../utils.js");
  const { default: shared } = await import("../index.js");

  getSharedDirectoryPath.mockImplementationOnce(() => {
    throw new Error("invalid option");
  });

  expect(async () => {
    await shared.getShared(customOptions);
  }).rejects.toThrow("invalid option");

  expect(getSharedDirectoryPath).toHaveBeenCalled();
});
