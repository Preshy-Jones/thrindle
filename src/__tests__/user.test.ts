function sum2(a: number, b: number) {
  return a + b;
}

test("adds 1 + 2 to equal 3", () => {
  expect(sum2(1, 2)).toBe(3);
});
