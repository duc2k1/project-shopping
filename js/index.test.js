const add = require("./index");
test("should ad 1+1 to equal 2", () => {
  expect(add(1, 1)).toBe(2);
});
test("should ad 1+1 to equal 3", () => {
  expect(sub(1, 1)).toBe(3);
});
