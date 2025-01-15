import { it, describe, expect } from "vitest";

import { isEmpty } from "./is-empty";

describe("isEmpty", () => {
  it("should return true for null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  it("should return true for undefined", () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  it("should return true for empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("should return false for non-empty string", () => {
    expect(isEmpty("abc")).toBe(false);
  });

  it("should return false for string with only whitespaces", () => {
    expect(isEmpty("   ")).toBe(false);
  });
});
