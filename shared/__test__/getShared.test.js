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
      getSharedPath: jest.fn(),
      getDynamicImport: jest.fn(),
    };
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

const customSharedDirectory = [
  {
    dir: "shared-fns",
    sharedFolder: "functions/shared-fns/index.js",
  },
];
const customSharedFolderPath = path.resolve() + "/shared-fns/index.js";

test("should call getSharedPath and getDynamicImport", async () => {
  const { getSharedPath, getDynamicImport } = await import("../utils.js");
  const { default: shared } = await import("../index.js");

  await shared.getShared(customSharedDirectory, customSharedFolderPath);

  expect(getSharedPath).toHaveBeenCalled();
  expect(getDynamicImport).toHaveBeenCalled();
});

test("should reject error on import issue", async () => {
  const { getSharedPath, getDynamicImport } = await import("../utils.js");
  const { default: shared } = await import("../index.js");

  getDynamicImport.mockRejectedValueOnce("invalid path");

  expect(async () => {
    await shared.getShared(customSharedDirectory, customSharedFolderPath);
  }).rejects.toEqual("invalid path");

  expect(getSharedPath).toHaveBeenCalled();
  expect(getDynamicImport).toHaveBeenCalled();
});

test("should reject error on invalid option", async () => {
  const { getSharedPath } = await import("../utils.js");
  const { default: shared } = await import("../index.js");

  getSharedPath.mockImplementationOnce(() => {
    throw new Error("invalid option");
  });

  expect(async () => {
    await shared.getShared(customSharedDirectory, customSharedFolderPath);
  }).rejects.toThrow("invalid option");

  expect(getSharedPath).toHaveBeenCalled();
});
