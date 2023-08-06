import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { AuthId } from "../auth/decorators/auth-user.decorator";
import { MessagesService } from "./messages.service";

@UseGuards(AuthGuard)
@Controller("messages")
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get("recent")
  getRecentMessages(@AuthId() authId: string) {
    console.log("RECENT-MESSAGES");
    console.log(authId);
    console.log("-------------------------");
    return this.messagesService.findRecentMessages(authId);
  }

  @Get(":id")
  getMessagesWithId(@Param("id") id: string, @AuthId() authId: string) {
    console.log("GET MESSAGES WITH ID");
    console.log("Message id: " + id + ", auth id: " + authId);
    console.log("-------------------------");
    return this.messagesService.findMessagesBetweenUsers(id, authId);
  }
}
