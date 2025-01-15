export const Theme = {
  Dark: "dark",
  Light: "light",
  System: "system",
} as const satisfies Record<string, string>;

export type Theme = (typeof Theme)[keyof typeof Theme];
