import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { chats } from "@/drizzle/schemas/chats.schema";
import { users } from "@/drizzle/schemas/users.schema";

export const messages = pgTable("messages", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "string" }).$onUpdate(
    () => sql`CURRENT_TIMESTAMP`
  ),
  isSeen: boolean("is_seen").default(false),
  isDeleted: boolean("is_deleted").default(false),
  senderId: text("sender_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
  chat: one(chats, {
    fields: [messages.chatId],
    references: [chats.id],
  }),
}));
