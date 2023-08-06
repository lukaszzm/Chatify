import type { User } from "./User";
import { z } from "zod";
import { NewMessageSchema } from "../schemas";

export type MessageForm = z.infer<typeof NewMessageSchema>;

export interface Message extends MessageForm {
  id: string;
  text: string;
  createdAt: Date;
  fromId: string;
  toId: string;
}

export interface RecentMessage extends Message {
  fullName: string;
  profileImage: string;
  userId: string;
}

export interface NewMessage extends Message {
  from: User;
  to: User;
}
