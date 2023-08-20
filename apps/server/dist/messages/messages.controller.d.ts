import { MessagesService } from "./messages.service";
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getRecentMessages(authId: string): Promise<any>;
    getMessagesWithId(id: string, authId: string): Promise<import("./message.entity").Message[]>;
}
//# sourceMappingURL=messages.controller.d.ts.map