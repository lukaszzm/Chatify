import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { users } from "@/drizzle/schemas/users.schema";

export const notes = pgTable("notes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  isLocked: boolean("is_locked").notNull().default(false),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const notesRelations = relations(notes, ({ one }) => ({
  user: one(users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));
