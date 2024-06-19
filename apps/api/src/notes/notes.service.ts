import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class NotesService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOneById(noteId: string, userId: string) {
    const note = await this.prismaService.note.findFirst({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      throw new NotFoundException("Note not found");
    }

    if (note.userId !== userId) {
      throw new UnauthorizedException("You are not authorized to access this note");
    }

    return note;
  }

  async findMany(userId: string) {
    return this.prismaService.note.findMany({
      where: {
        userId,
      },
    });
  }
}
