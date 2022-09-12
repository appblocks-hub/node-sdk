import { isValidFunction } from "../utils.js";

// Case valid
test("should return true", () => {
  const result = isValidFunction(() => {});
  expect(result).toBe(true);
});

// Case invalid
test("should return false", () => {
  const result = isValidFunction("");
  expect(result).toBe(false);
});

