import { describe, expect, it } from "vitest";

import { extractErrorMessage } from "./extract-error-message";

describe("extractErrorMessage", () => {
  it("should extract error message", () => {
    const error = "[Error] This is an error";

    const result = extractErrorMessage(error);

    expect(result).toBe("This is an error");
  });

  it("should return error if no match", () => {
    const error = "This is an error";

    const result = extractErrorMessage(error);

    expect(result).toBe("This is an error");
  });
});
