/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import mockAxios from "axios";
import { jest } from "@jest/globals";
import { callShieldServer } from "../utils.js";

jest.mock("axios");

beforeAll(() => {
  global.abConfig = {
    clientId: "test clientId",
    clientSecret: "test clientSecret",
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

test("should make axios call and return data", async () => {
  mockAxios.post = jest
    .fn()
    .mockResolvedValueOnce({ data: { data: { name: "Mock Name" } } });

  const req = { headers: { authorization: "test token" } };
  const url = "test_url";
  const result = await callShieldServer(req, url);

  expect(result.name).toBe("Mock Name");
  expect(mockAxios.post).toHaveBeenCalledTimes(1);
});

test("should make axios call and return error", async () => {
  mockAxios.post = jest
    .fn()
    .mockRejectedValueOnce({
      response: { status: 401, data: { data: "auth failed" } },
    });

  const req = { headers: { authorization: "test token" } };
  const url = "test_url";

  expect(async () => {
    await callShieldServer(req, url);
  }).rejects.toThrow("auth failed");

  expect(mockAxios.post).toHaveBeenCalledTimes(1);
});

test("should throw authrization header is not set", () => {
  const req = { headers: {} };
  const url = "test_url";

  expect(async () => {
    await callShieldServer(req, url);
  }).rejects.toThrow("Authorization header is not set");
});

test("should throw app config error", () => {
  global.abConfig = {};
  const req = { headers: { authorization: "test token" } };
  const url = "http://localhost:3000";

  expect(async () => {
    await callShieldServer(req, url);
  }).rejects.toThrow("Appblocks app config is not set");
});
