import internals from "../index.js";

// Case success
test("should return true", () => {
  const config = {
    clientId: "test_client_id",
    clientSecret: "test_client_secret",
  };
  const result = internals.initialize(config);
  expect(result).toBe(true);
});

// Case Error 1
test("should return No config passed", () => {
  expect(() => {
    internals.initialize();
  }).toThrowError("No config passed");
});

// Case Error 2
test("should return Invalid config passed", () => {
  const config = { clientId: "", clientSecret: "" };
  expect(() => {
    internals.initialize(config);
  }).toThrowError("Invalid config passed");
});
