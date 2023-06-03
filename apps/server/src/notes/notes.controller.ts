import { Controller, Post, Get, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { CreateNoteDto } from "./dtos/create-note.dto";
import { NotesService } from "./notes.service";
import { AuthGuard } from "../auth/auth.guard";
import { AuthId } from "../auth/decorators/auth-user.decorator";

@UseGuards(AuthGuard)
@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  getAllNotes(@AuthId() userId: string) {
    return this.notesService.findAll(userId);
  }

  @Post()
  createNote(@Body() body: CreateNoteDto, @AuthId() userId: string) {
    return this.notesService.create(body, userId);
  }

  @Get(":id")
  getNoteById(@Param("id") noteId: string, @AuthId() userId: string) {
    return this.notesService.findOne(noteId, userId);
  }

  @Delete(":id")
  deleteNoteById(@Param("id") noteId: string, @AuthId() userId: string) {
    return this.notesService.delete(noteId, userId);
  }
}
