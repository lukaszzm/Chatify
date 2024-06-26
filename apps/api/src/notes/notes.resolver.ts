import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { CreateNoteInput } from "@/notes/dtos/create-note.input";
import { Note } from "@/notes/models/note.model";
import { NotesService } from "@/notes/notes.service";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

@Resolver(() => Note)
export class NotesResolver {
  constructor(
    private readonly notesService: NotesService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Note)
  async note(
    @Args("noteId", { type: () => String }) noteId: string,
    @CurrentUser() me: User
  ) {
    return this.notesService.findOneById(noteId, me.id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Note])
  async notes(@CurrentUser() me: User) {
    return this.notesService.findMany(me.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Note)
  async createNote(@Args("data") data: CreateNoteInput, @CurrentUser() me: User) {
    return this.notesService.create(data, me.id);
  }

  @ResolveField()
  async user(@Parent() note: Note) {
    return this.usersService.findOneById(note.userId);
  }
}
