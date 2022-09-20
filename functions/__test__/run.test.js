/**
 * Copyright (c)  Appblocks and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import mockhttp from "http";
import { jest } from "@jest/globals";

jest.mock("http");

beforeAll(() => {
  jest.unstable_mockModule("../utils.js", () => ({
    getPort: jest.fn(() => 3000),
  }));

  mockhttp.createServer = jest
    .fn(() => {})
    .mockReturnValue({ listen: jest.fn(() => {}) });
});

afterAll(() => {
  jest.clearAllMocks();
});

test("should get port, create server and listen ", async () => {
  const { getPort } = await import("../utils.js");
  const { default: funcitons } = await import("../index.js");

  // Simple test request handler
  const requestHandler = (req, res, next) => {
    res.writeHead(200, "Content-Type", "application/json");
    res.write(JSON.stringify({ message: "sample request handler" }));
    return "sample request handler";
  };

  await funcitons.run(requestHandler);

  expect(getPort).toHaveBeenCalledTimes(1);
  expect(mockhttp.createServer).toHaveBeenCalledTimes(1);
  expect(mockhttp.createServer().listen).toHaveBeenCalledTimes(1);
});

test("should throw invalid handler passed ", async () => {
  const { default: funcitons } = await import("../index.js");
  expect(async () => {
    await funcitons.run();
  }).rejects.toThrow("invalid handler passed");
});
