import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dtos/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(@InjectRepository(Message) private messagesRepository: Repository<Message>) {}

  async create(body: CreateMessageDto, id: string) {
    if (id !== body.fromId) throw new UnauthorizedException();

    const message = await this.messagesRepository.create(body);
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
}
