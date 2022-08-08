import { isEmptyString } from "../utils.js";

// Case valid
test("should return false", () => {
  const result = isEmptyString("test");
  expect(result).toBe(false);
});

// Case invalid
test("should return true", () => {
  const result = isEmptyString(123);
  expect(result).toBe(true);
});
