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

afterEach(() => {
  jest.clearAllMocks();
});

// case success
test("should return user id", async () => {
  const { callShieldServer } = await import("../utils.js");
  const { default: shield } = await import("../index.js");

  callShieldServer.mockResolvedValueOnce({ user_id: "test_id" });

  const user_id = await shield.getUID();
  expect(user_id).toBe("test_id");
  expect(callShieldServer).toHaveBeenCalled();
});

// case error
test("should reject error", async () => {
  const { callShieldServer } = await import("../utils.js");
  const { default: shield } = await import("../index.js");

  callShieldServer.mockRejectedValueOnce("auth failed");

  expect(async () => {
    await shield.getUID();
  }).rejects.toEqual("auth failed");

  expect(callShieldServer).toHaveBeenCalled();
});
