import tc from "./tc";

describe("tc() function", () => {
  it("should return a string of class names", () => {
    expect(tc("class1", "class2", "class3")).toBe("class1 class2 class3");
  });

  it("should ignore boolean, null, and undefined values", () => {
    expect(tc("class1", true, false, null, undefined, "class2")).toBe(
      "class1 class2"
    );
  });

  it("should handle single class name", () => {
    expect(tc("class1")).toBe("class1");
  });

  it("should return an empty string when there are no valid class names", () => {
    expect(tc(true, false, null, undefined)).toBe("");
  });

  it("should handle cases when only boolean values are provided", () => {
    expect(tc(true, false)).toBe("");
  });

  it("should handle cases when only null or undefined values are provided", () => {
    expect(tc(null, undefined)).toBe("");
  });

  it("should ignore leading and trailing spaces in class names", () => {
    expect(tc(" class1 ", " class2 ")).toBe("class1 class2");
  });

  it("should ignore multiple spaces only as input", () => {
    expect(tc("   ", "  ")).toBe("");
  });

  it("should trim multiple spaces between words in class names", () => {
    expect(tc("  class1     class2  ", "  class3    class4  ")).toBe(
      "class1 class2 class3 class4"
    );
  });

  it("should correctly merge conflicting tailwind classes", () => {
    const result = tc("bg-red-500", "bg-green-500");
    expect(result).toBe("bg-green-500");
  });

  it("should handle conditionals", () => {
    expect(tc("bg-blue-500", true && "text-white", "hover:bg-blue-700")).toBe(
      "bg-blue-500 text-white hover:bg-blue-700"
    );
  });

  it("should handle objects", () => {
    expect(
      tc({
        "bg-red-500": true,
        "text-red-900": false,
        "hover:bg-red-700": true,
      })
    ).toBe("bg-red-500 hover:bg-red-700");
  });

  it("should handle variadic objects", () => {
    expect(
      tc({ "bg-green-500": true }, { "text-green-900": false }, null, {
        "hover:bg-green-700": true,
      })
    ).toBe("bg-green-500 hover:bg-green-700");
  });

  it("should handle arrays", () => {
    expect(tc(["bg-yellow-500", 0, false, "text-yellow-900"])).toBe(
      "bg-yellow-500 text-yellow-900"
    );
  });

  it("should handle variadic arrays", () => {
    expect(
      tc(
        ["bg-indigo-500"],
        ["", 0, false, "text-indigo-900"],
        [
          [
            "hover:bg-indigo-700",
            [["active:bg-indigo-900"], "focus:bg-indigo-300"],
          ],
        ]
      )
    ).toBe(
      "bg-indigo-500 text-indigo-900 hover:bg-indigo-700 active:bg-indigo-900 focus:bg-indigo-300"
    );
  });

  it("should handle kitchen sink (with nesting)", () => {
    expect(
      tc(
        "bg-purple-500",
        [
          true && "text-purple-900",
          { "hover:bg-purple-700": false, "active:bg-purple-900": true },
          ["focus:bg-purple-300", ["focus:ring-2"]],
        ],
        "hover:ring-purple-200"
      )
    ).toBe(
      "bg-purple-500 text-purple-900 active:bg-purple-900 focus:bg-purple-300 focus:ring-2 hover:ring-purple-200"
    );
  });

  it("should discard falsey values and standalone boolean values", () => {
    expect(tc(true, false, "", null, undefined, 0, NaN)).toBe("");
  });
});
