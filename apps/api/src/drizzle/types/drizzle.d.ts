import type { NodePgDatabase } from "drizzle-orm/node-postgres";

import type * as schema from "@/drizzle/schema";

export type DrizzleDB = NodePgDatabase<typeof schema>;
