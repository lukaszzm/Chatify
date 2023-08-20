import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dtos/create-message.dto";
export declare class MessagesService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    create(body: CreateMessageDto, fromId: string): Promise<Message | null>;
    findMessagesBetweenUsers(firstUserId: string, secondUserId: string): Promise<Message[]>;
    findRecentMessages(userId: string): Promise<any>;
}
//# sourceMappingURL=messages.service.d.ts.map