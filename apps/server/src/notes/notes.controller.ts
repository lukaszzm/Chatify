import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { CreateNoteDto } from "./dtos/create-note.dto";
import { NotesService } from "./notes.service";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  getAllNotes() {
    return this.notesService.findAll();
  }

  @Post()
  createNote(@Body() body: CreateNoteDto) {
    return this.notesService.create(body);
  }

  @Get(":id")
  getNoteById(@Param("id") id: string) {
    return this.notesService.findOne(id);
  }

  @Delete(":id")
  deleteNoteById(@Param("id") id: string) {
    return this.notesService.delete(id);
  }
}
