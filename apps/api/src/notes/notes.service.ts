import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, asc, eq } from "drizzle-orm";
import { withCursorPagination } from "drizzle-pagination";

import { PaginationArgs } from "@/common/dtos/pagination.args";
import { SortOrder } from "@/common/enums/sort-order";
import { createCursorPaginationResult } from "@/common/utils/cursor-pagination-result";
import { DRIZZLE } from "@/drizzle/drizzle.module";
import { notes } from "@/drizzle/schema";
import { DrizzleDB } from "@/drizzle/types/drizzle";
import { CreateNoteInput } from "@/notes/dtos/create-note.input";

@Injectable()
export class NotesService {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  async findOneById(id: string, userId: string) {
    return this.db.query.notes.findFirst({
      where: eq(notes.id, id) && eq(notes.userId, userId),
    });
  }

  async findMany(userId: string) {
    return this.db.query.notes.findMany({
      where: eq(notes.userId, userId),
      orderBy: asc(notes.createdAt),
    });
  }

  async findManyWithPagination(userId: string, pagination: PaginationArgs) {
    const paginatedNotes = await this.db.query.notes.findMany(
      withCursorPagination({
        where: eq(notes.userId, userId),
        limit: pagination.first + 1,
        cursors: [[notes.createdAt, SortOrder.Asc, pagination.after]],
      })
    );

    return createCursorPaginationResult(paginatedNotes, pagination);
  }

  async create(payload: CreateNoteInput, userId: string) {
    const [createdNote] = await this.db
      .insert(notes)
      .values({
        ...payload,
        userId,
        content: "",
      })
      .returning();

    return createdNote;
  }

  async delete(noteId: string, userId: string) {
    const [deletedNote] = await this.db
      .delete(notes)
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .returning();

    return deletedNote;
  }

  async update(noteId: string, content: string, userId: string) {
    const [updatedNote] = await this.db
      .update(notes)
      .set({ content })
      .where(and(eq(notes.id, noteId), eq(notes.userId, userId)))
      .returning();

    return updatedNote;
  }

  async toggleLock(noteId: string, userId: string) {
    return this.db.transaction(async (tx) => {
      const note = await tx.query.notes.findFirst({
        where: eq(notes.id, noteId) && eq(notes.userId, userId),
      });

      if (!note) {
        throw new NotFoundException("Note not found");
      }

      const [updatedNote] = await tx
        .update(notes)
        .set({ isLocked: !note.isLocked })
        .where(eq(notes.id, noteId))
        .returning();

      return updatedNote;
    });
  }
}
