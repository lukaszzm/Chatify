import { Inject, Injectable } from "@nestjs/common";
import { desc, eq } from "drizzle-orm";
import { withCursorPagination } from "drizzle-pagination";

import { PaginationArgs } from "@/common/dtos/pagination.args";
import { SortOrder } from "@/common/enums/sort-order";
import { createCursorPaginationResult } from "@/common/utils/cursor-pagination-result";
import { DRIZZLE } from "@/drizzle/drizzle.module";
import { chats, messages } from "@/drizzle/schema";
import { DrizzleDB } from "@/drizzle/types/drizzle";
import { SendMessageInput } from "@/messages/dtos/send-message.input";

@Injectable()
export class MessagesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findManyByChatId(chatId: string) {
    return this.db.query.messages.findMany({
      where: eq(messages.chatId, chatId),
    });
  }

  async findManyByUserId(userId: string) {
    return this.db.query.messages.findMany({
      where: eq(messages.senderId, userId),
    });
  }

  async findLatestByChatId(chatId: string) {
    return this.db.query.messages.findFirst({
      where: eq(messages.chatId, chatId),
      orderBy: desc(messages.createdAt),
    });
  }

  async findManyByChatIdWithPagination(chatId: string, pagination: PaginationArgs) {
    const paginatedMessages = await this.db.query.messages.findMany(
      withCursorPagination({
        where: eq(messages.chatId, chatId),
        limit: pagination.first + 1,
        cursors: [[messages.createdAt, SortOrder.Desc, pagination.after]],
      })
    );

    return createCursorPaginationResult(paginatedMessages, "createdAt", pagination);
  }

  async create(data: SendMessageInput, senderId: string) {
    return this.db.transaction(async (tx) => {
      const [message] = await tx
        .insert(messages)
        .values({
          content: data.content,
          chatId: data.chatId,
          senderId,
        })
        .returning();

      await tx
        .update(chats)
        .set({
          lastMessageAt: message.createdAt,
        })
        .where(eq(chats.id, data.chatId));

      return message;
    });
  }
}
