import type {
  User as DBUser,
  Message as DBMessage,
  Note as DBNote,
  Chat as DBChat,
} from "@chatify/db";

export type User = DBUser;
export type Message = DBMessage;
export type Chat = DBChat;
export type Note = DBNote;

export type Nullable<T> = T | null;
