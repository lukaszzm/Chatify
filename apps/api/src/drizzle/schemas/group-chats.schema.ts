import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

import { chats } from "@/drizzle/schemas/chats.schema";

export const groupChats = pgTable("group_chats", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  chatId: text("chat_id")
    .notNull()
    .references(() => chats.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const groupChatsRelations = relations(groupChats, ({ one }) => ({
  chat: one(chats, {
    fields: [groupChats.chatId],
    references: [chats.id],
  }),
}));
