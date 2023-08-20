import { Repository } from "typeorm";
import { Note } from "./note.entity";
import { CreateNoteDto } from "./dtos/create-note.dto";
export declare class NotesService {
    private notesRepository;
    constructor(notesRepository: Repository<Note>);
    findAll(userId: string): Promise<Note[]>;
    findOne(noteId: string, userId: string): Promise<Note>;
    create(body: CreateNoteDto, userId: string): Promise<Note>;
    delete(noteId: string, userId: string): Promise<Note>;
}
//# sourceMappingURL=notes.service.d.ts.map