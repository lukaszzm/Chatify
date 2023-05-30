import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateMessageDto } from "./dtos/create-message.dto";

@Controller("messages")
export class MessagesController {
  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return "Created message: " + body.text + ", " + body.fromId + ", " + body.toId + ", " + body.createdAt;
  }

  @Get(":id")
  getMessagesWithUser(@Param("id") id: string) {
    return "messages with user: " + id;
  }

  @Get()
  getRecentMessages() {
    return "recent messages";
  }
}
