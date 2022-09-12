/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { jest } from "@jest/globals";

beforeAll(() => {
  jest.unstable_mockModule("../utils.js", () => ({
    callShieldServer: jest.fn(() => {}),
  }));
});

afterAll(() => {
  jest.clearAllMocks();
});

// case success
test("should return user details", async () => {
  const { callShieldServer } = await import("../utils.js");
  const { default: shield } = await import("../index.js");

  callShieldServer.mockResolvedValueOnce({
    user_id: "test_id",
    name: "test_name",
  });

  const userData = await shield.getUser();
  expect(userData.name).toBe("test_name");
  expect(callShieldServer).toHaveBeenCalled();
});

// case error
test("should reject error", async () => {
  const { callShieldServer } = await import("../utils.js");
  const { default: shield } = await import("../index.js");

  callShieldServer.mockRejectedValueOnce("auth failed");

  expect(async () => {
    await shield.getUser();
  }).rejects.toEqual("auth failed");

  expect(callShieldServer).toHaveBeenCalled();
});
