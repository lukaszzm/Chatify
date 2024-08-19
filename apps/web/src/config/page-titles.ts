import type { LinkProps } from "@tanstack/react-router";

type Route = Exclude<LinkProps["to"], undefined>;

export const pageTitles = {
  "/sign-in": "Sign In | Chatify",
  "/sign-up": "Sign Up | Chatify",
  "/chat": "Chat | Chatify",
  "/notes": "Notes | Chatify",
  "/settings/notifications": "Notifications | Chatify",
  "/settings/appearance": "Appearance | Chatify",
  "/settings/profile": "My Profile | Chatify",
  "/settings": "Settings | Chatify",
  "/": "Chatify - Connect, Communicate, Collaborate",
} as const satisfies Partial<Record<Route, string>>;
