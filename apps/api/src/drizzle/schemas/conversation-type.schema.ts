import { pgEnum } from "drizzle-orm/pg-core";

export const conversationType = pgEnum("conversation_type", ["ONE_TO_ONE", "GROUP"]);
