import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { CreateNoteInput } from "@/notes/dtos/create-note.input";

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(id: string) {
    return this.prismaService.note.findFirst({
      where: {
        id,
      },
    });
  }

  async findMany(userId: string) {
    return this.prismaService.note.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }

  async findOneOrThrow(id: string, userId: string) {
    const note = await this.findOneById(id);

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (note.userId !== userId) {
      throw new UnauthorizedException("Unauthorized access");
    }

    return note;
  }

  async create(data: CreateNoteInput, userId: string) {
    return await this.prismaService.note.create({
      data: {
        ...data,
        userId,
        content: "",
      },
    });
  }

  async delete(noteId: string, userId: string) {
    await this.findOneOrThrow(noteId, userId);

    return this.prismaService.note.delete({
      where: {
        id: noteId,
      },
    });
  }

  async update(noteId: string, content: string, userId: string) {
    await this.findOneOrThrow(noteId, userId);

    return this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: {
        content,
      },
    });
  }

  async toggleLock(noteId: string, userId: string) {
    const note = await this.findOneOrThrow(noteId, userId);

    return this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: {
        isLocked: !note.isLocked,
      },
    });
  }
}
