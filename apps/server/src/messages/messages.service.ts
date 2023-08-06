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
    const newMessage = await this.messagesRepository.create({
      from: {
        id: fromId,
      },
      to: {
        id: toId,
      },
      text,
    });
    const { id } = await this.messagesRepository.save(newMessage);

    return this.messagesRepository.findOne({
      where: {
        id,
      },
      relations: ["from", "to"],
    });
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
    // TODO: better query
    return this.messagesRepository.query(`
        SELECT DISTINCT ON ("userId") *
            FROM (
                SELECT m.id, m."fromId" AS "userId", m.text, m."createdAt", m."fromId", m."toId", u."profileImage", u."fullName"
                FROM message m
                LEFT JOIN "user" u ON m."fromId" = u.id
                WHERE "toId" = '${userId}'

            UNION ALL
                SELECT  m.id, m."toId" AS "userId", m.text, m."createdAt", m."fromId", m."toId", u."profileImage", u."fullName"
                FROM message m
                LEFT JOIN "user" u ON m."toId" = u.id
                WHERE "fromId" = '${userId}'
                ) sub
            ORDER BY "userId", "createdAt" DESC;`);
  }
}
