import { isEmptyObject } from "../utils.js";

// Case valid
test("should return false", () => {
  const result = isEmptyObject({ test: "test" });
  expect(result).toBe(false);
});

// Case invalid
test("should return true", () => {
  const result = isEmptyObject("");
  expect(result).toBe(true);
});
