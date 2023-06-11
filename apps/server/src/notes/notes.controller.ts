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
    return this.notesService.findAll(authId);
  }

  @Post()
  createNote(@Body() body: CreateNoteDto, @AuthId() authId: string) {
    return this.notesService.create(body, authId);
  }

  @Get(":id")
  getNoteById(@Param("id") noteId: string, @AuthId() authId: string) {
    return this.notesService.findOne(noteId, authId);
  }

  @Delete(":id")
  deleteNoteById(@Param("id") noteId: string, @AuthId() authId: string) {
    return this.notesService.delete(noteId, authId);
  }
}
