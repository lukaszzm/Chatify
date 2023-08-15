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

  async findRecentMessages(userId: string) {
    return this.messagesRepository.query(`SELECT sub.*
    FROM (
        SELECT DISTINCT ON (CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END)
            m.id,
            CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END AS "userId",
            m.text,
            m."createdAt",
            m."fromId",
            m."toId",
            u."profileImage",
            u."fullName"
        FROM message m
        LEFT JOIN "user" u ON CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END = u.id
        WHERE "fromId" = '${userId}' OR "toId" = '${userId}'
        ORDER BY
            CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END,
            "createdAt" DESC
    ) sub
    ORDER BY "createdAt" DESC;`);
  }
}
