import type { LinkProps } from "@tanstack/react-router";
import { describe, it, expect } from "vitest";

import { matchPageTitle } from "./match-page-title";

describe("matchPageTitle", () => {
  it("should match the title for the root path", () => {
    expect(matchPageTitle("/")).toBe("Chatify - Connect, Communicate, Collaborate");
  });

  it("should match the title for the exact path", () => {
    expect(matchPageTitle("/sign-in")).toBe("Sign In | Chatify");
  });

  it("should match the title for the nested path", () => {
    expect(matchPageTitle("/chat/$chatId")).toBe("Chat | Chatify");
  });

  it("should match the default title for the unknown path", () => {
    expect(matchPageTitle("/unknown" as NonNullable<LinkProps["to"]>)).toBe("Chatify");
  });
});
