import { ObjectType } from "@nestjs/graphql";

import { Paginated } from "@/common/models/paginated.model";
import { Note } from "@/notes/models/note.model";

@ObjectType("NoteConnection")
export class PaginatedNote extends Paginated(Note) {}
