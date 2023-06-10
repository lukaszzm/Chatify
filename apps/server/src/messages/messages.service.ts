import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dtos/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) {}

  async create(body: CreateMessageDto, fromId: string) {
    const { toId, text } = body;
    const message = await this.messagesRepository.create({
      from: {
        id: fromId,
      },
      to: {
        id: toId,
      },
      text,
    });

    return this.messagesRepository.save(message);
  }

  findMessagesBetweenUsers(firstUserId: string, secondUserId: string) {
    return this.messagesRepository.find({
      where: [
        {
          from: {
            id: firstUserId,
          },
          to: {
            id: secondUserId,
          },
        },
        {
          from: {
            id: secondUserId,
          },
          to: {
            id: firstUserId,
          },
        },
      ],
    });
  }

  findRecentMessages(userId: string) {
    return this.messagesRepository.query(`
        SELECT DISTINCT ON ("userId") *
            FROM (
                SELECT id, "fromId" AS "userId", text, "createdAt"
                FROM message
                WHERE "toId" = '${userId}'

            UNION ALL
                SELECT  id, "toId" AS "userId", text, "createdAt"
                FROM message
                WHERE "fromId" = '${userId}'
                ) sub
            ORDER BY "userId", "createdAt" DESC;`);
  }
}
