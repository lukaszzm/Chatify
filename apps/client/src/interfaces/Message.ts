import { User } from "./User";

export interface Message {
  _id: string;
  text: string;
  fromId: string;
  toId: string;
  createdAt: Date | string;
  userInfo: User[];
}
