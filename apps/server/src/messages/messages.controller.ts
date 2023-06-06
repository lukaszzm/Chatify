import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateMessageDto } from "./dtos/create-message.dto";
import { AuthGuard } from "../auth/auth.guard";
import { AuthId } from "../auth/decorators/auth-user.decorator";
import { MessagesService } from "./messages.service";

@UseGuards(AuthGuard)
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Post()
  createMessage(@Body() body: CreateMessageDto, @AuthId() id: string) {
    return this.messagesService.create(body, id);
  }

  @Get(":id")
  getMessagesWithId(@Param("id") id: string, @AuthId() userId: string) {
    return this.messagesService.findMessagesBetweenUsers(id, userId);
  }

  @Get("recent")
  getRecentMessages() {
    return "recent messages";
  }
}
