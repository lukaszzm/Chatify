import { Controller, Post, Get, Delete, Body, Param } from "@nestjs/common";
import { CreateNoteDto } from "./dtos/create-note.dto";

@Controller("notes")
export class NotesController {
  @Get()
  getAllNotes() {
    return "all notes";
  }

  @Post()
  createNote(@Body() post: CreateNoteDto) {
    return post;
  }

  @Get(":id")
  getNoteById(@Param("id") id: string) {
    return "Note by id: " + id;
  }

  @Delete(":id")
  deleteNoteById(@Param("id") id: string) {
    return "Note with id: " + id + "deleted.";
  }
}
