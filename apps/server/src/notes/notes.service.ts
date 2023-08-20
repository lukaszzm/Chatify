import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "./note.entity";
import { CreateNoteDto } from "./dtos/create-note.dto";

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}

  findAll(userId: string) {
    return this.notesRepository.findBy({
      user: {
        id: userId,
      },
    });
  }

  async findOne(noteId: string, userId: string) {
    const note = await this.notesRepository.findOne({
      where: {
        id: noteId,
      },
      relations: {
        user: true,
      },
      select: {
        user: {
          id: true,
        },
      },
    });

    if (!note) throw new NotFoundException();

    if (note.user.id != userId) throw new UnauthorizedException();

    return note;
  }

  create(body: CreateNoteDto, userId: string) {
    const { title, text } = body;
    const newNote = this.notesRepository.create({
      title,
      text,
      user: {
        id: userId,
      },
    });

    return this.notesRepository.save(newNote);
  }

  async delete(noteId: string, userId: string) {
    const note = await this.notesRepository.findOne({
      where: { id: noteId },
      relations: {
        user: true,
      },
    });

    if (!note) throw new NotFoundException();

    if (note.user.id !== userId) throw new UnauthorizedException();

    return this.notesRepository.remove(note);
  }
}
