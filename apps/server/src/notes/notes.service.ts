import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "./note.entity";
import { CreateNoteDto } from "./dtos/create-note.dto";

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private notesRepository: Repository<Note>) {}

  findAll() {
    return this.notesRepository.find();
  }

  findOne(id: string) {
    return this.notesRepository.findOneBy({ id });
  }

  create(body: CreateNoteDto) {
    const { createdAt, title, text } = body;
    const newNote = this.notesRepository.create({
      title,
      text,
      createdAt,
    });

    return this.notesRepository.save(newNote);
  }

  async delete(id: string) {
    const note = await this.notesRepository.findOneBy({ id });
    if (!note) throw new NotFoundException();

    return this.notesRepository.remove(note);
  }
}
