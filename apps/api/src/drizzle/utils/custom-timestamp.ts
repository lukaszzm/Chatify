import type { SQL } from "drizzle-orm";
import type { Precision } from "drizzle-orm/pg-core";
import { customType } from "drizzle-orm/pg-core";

export const customTimestamp = customType<{
  data: Date;
  driverData: string;
  config: { precision?: Precision };
}>({
  dataType(config) {
    const precision = config?.precision === undefined ? "" : ` (${config.precision})`;
    return `timestamp${precision} with time zone`;
  },
  fromDriver(value: string) {
    return new Date(value);
  },
  toDriver(value: Date | SQL) {
    if ("toISOString" in value) {
      return value.toISOString();
    }
    return value;
  },
});
