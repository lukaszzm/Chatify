import { Controller, Post, Get, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { CreateNoteDto } from "./dtos/create-note.dto";
import { NotesService } from "./notes.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { AuthId } from "../auth/decorators/auth-user.decorator";

@UseGuards(AuthGuard)
@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  getAllNotes(@AuthId() authId: string) {
    console.log("GET-ALL-NOTES");
    console.log(authId);
    console.log("-------------------------");
    return this.notesService.findAll(authId);
  }

  @Post()
  createNote(@Body() body: CreateNoteDto, @AuthId() authId: string) {
    console.log("CREATE-NOTE");
    console.log(body);
    console.log("auth id: " + authId);
    console.log("-------------------------");
    return this.notesService.create(body, authId);
  }

  @Get(":id")
  getNoteById(@Param("id") noteId: string, @AuthId() authId: string) {
    console.log("Get-Note-By-Id");
    console.log(noteId);
    console.log("auth-id: " + authId);
    console.log("-------------------------");
    return this.notesService.findOne(noteId, authId);
  }

  @Delete(":id")
  deleteNoteById(@Param("id") noteId: string, @AuthId() authId: string) {
    console.log("DELETE-NOTE");
    console.log(noteId);
    console.log("auth id: " + authId);
    console.log("-------------------------");
    return this.notesService.delete(noteId, authId);
  }
}
