import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { and, count, eq, exists, inArray, isNotNull } from "drizzle-orm";
import { withCursorPagination } from "drizzle-pagination";

import { StartChatInput } from "@/chats/dtos/start-chat.input";
import { PaginationArgs } from "@/common/dtos/pagination.args";
import { SortOrder } from "@/common/enums/sort-order";
import { createCursorPaginationResult } from "@/common/utils/cursor-pagination-result";
import { removeDuplicates } from "@/common/utils/remove-duplicates";
import { DRIZZLE } from "@/drizzle/drizzle.module";
import { chats, participants } from "@/drizzle/schema";
import { DrizzleDB } from "@/drizzle/types/drizzle";

@Injectable()
export class ChatsService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findOneById(id: string, userId: string) {
    return this.db.query.chats.findFirst({
      where: and(
        eq(chats.id, id),
        exists(
          this.db
            .select()
            .from(participants)
            .where(
              and(eq(participants.userId, userId), eq(participants.chatId, chats.id))
            )
        )
      ),
    });
  }

  async findManyByUserId(userId: string, pagination: PaginationArgs) {
    const paginatedChats = await this.db.query.chats.findMany(
      withCursorPagination({
        where: and(
          exists(
            this.db
              .select()
              .from(participants)
              .where(
                and(eq(participants.userId, userId), eq(participants.chatId, chats.id))
              )
          ),
          isNotNull(chats.lastMessageAt)
        ),
        limit: pagination.first + 1,
        cursors: [[chats.lastMessageAt, SortOrder.Desc, pagination.after]],
      })
    );

    return createCursorPaginationResult(paginatedChats, "lastMessageAt", pagination);
  }

  async create(data: StartChatInput) {
    const uniqueParticipants = removeDuplicates(data.participants);

    if (uniqueParticipants.length !== 2) {
      throw new BadRequestException(
        "Currently, only chats with two participants are supported."
      );
    }

    return this.db.transaction(async (tx) => {
      const [newChat] = await tx
        .insert(chats)
        .values({
          type: "ONE_TO_ONE",
        })
        .returning();

      const participantsPromises = uniqueParticipants.map((userId) =>
        tx.insert(participants).values({
          chatId: newChat.id,
          userId,
        })
      );

      await Promise.all(participantsPromises);

      return newChat;
    });
  }

  async createIfNotExists(data: StartChatInput) {
    const uniqueParticipants = removeDuplicates(data.participants);

    const existingChat = await this.db.query.chats.findFirst({
      where: and(
        eq(
          this.db
            .select({ count: count() })
            .from(participants)
            .where(
              and(
                eq(participants.chatId, chats.id),
                inArray(participants.userId, uniqueParticipants)
              )
            ),
          uniqueParticipants.length
        )
      ),
    });

    if (existingChat) {
      return existingChat;
    }

    return this.create(data);
  }
}
