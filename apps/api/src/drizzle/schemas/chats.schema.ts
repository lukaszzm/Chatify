import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { conversationType } from "@/drizzle/schemas/conversation-type.schema";
import { messages } from "@/drizzle/schemas/messages.schema";
import { participants } from "@/drizzle/schemas/participants.schema";

export const chats = pgTable("chats", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: timestamp("created_at", { mode: "string", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string", withTimezone: true }).$onUpdate(
    () => sql`CURRENT_TIMESTAMP`
  ),
  lastMessageAt: timestamp("last_message_at", { mode: "string", withTimezone: true }),
  isDeleted: boolean("is_deleted").default(false),
  type: conversationType("type").notNull().default("ONE_TO_ONE"),
});

export const chatsRelations = relations(chats, ({ many, one }) => ({
  messages: many(messages),
  participants: many(participants),
  groupInfo: one(chats, { fields: [chats.id], references: [chats.id] }),
}));
