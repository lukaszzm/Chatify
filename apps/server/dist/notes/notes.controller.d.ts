import { CreateNoteDto } from "./dtos/create-note.dto";
import { NotesService } from "./notes.service";
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    getAllNotes(authId: string): Promise<import("./note.entity").Note[]>;
    createNote(body: CreateNoteDto, authId: string): Promise<import("./note.entity").Note>;
    getNoteById(noteId: string, authId: string): Promise<import("./note.entity").Note>;
    deleteNoteById(noteId: string, authId: string): Promise<import("./note.entity").Note>;
}
//# sourceMappingURL=notes.controller.d.ts.map