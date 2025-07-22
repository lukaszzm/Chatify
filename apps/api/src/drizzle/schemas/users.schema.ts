import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { messages } from "@/drizzle/schemas/messages.schema";
import { notes } from "@/drizzle/schemas/notes.schema";
import { participants } from "@/drizzle/schemas/participants.schema";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  email: text("email").notNull().unique(),
  profilePicture: text("profile_picture"),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  fullName: text("full_name").notNull(),
  password: text("password").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(users, ({ many }) => ({
  sentMessages: many(messages),
  chats: many(participants),
  notes: many(notes),
}));
