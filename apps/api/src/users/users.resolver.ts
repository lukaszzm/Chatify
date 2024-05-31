import { Args, Query, Resolver } from "@nestjs/graphql";
import type { User as UserType } from "@prisma/client";
import { UseGuards } from "@nestjs/common";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { CurrentUser } from "@/auth/decorators/current-user.decorator";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user: UserType) {
    return this.usersService.findOneById(user.id);
  }

  @Query(() => User)
  async user(@Args("id", { type: () => String }) id: string) {
    return this.usersService.findOneById(id);
  }

  @Query(() => [User])
  async users() {
    return this.usersService.findMany();
  }
}
