import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import { chats } from "@/drizzle/schemas/chats.schema";
import { users } from "@/drizzle/schemas/users.schema";

export const participants = pgTable("participants", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const participantsRelations = relations(participants, ({ one }) => ({
  user: one(users, {
    fields: [participants.userId],
    references: [users.id],
  }),
  chat: one(chats, {
    fields: [participants.chatId],
    references: [chats.id],
  }),
}));
