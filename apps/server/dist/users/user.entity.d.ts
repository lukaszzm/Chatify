import { Note } from "../notes/note.entity";
import { Message } from "../messages/message.entity";
export declare class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    fullName: string;
    profileImage: string;
    notes: Note[];
    sentMessages: Message[];
    receivedMessages: Message[];
}
//# sourceMappingURL=user.entity.d.ts.map