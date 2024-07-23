import type { Nullable } from "@/types";

export const isEmpty = (str?: Nullable<string>): boolean => {
  return str === null || str === undefined || str === "";
};
