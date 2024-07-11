import type { User as UserType } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { SearchUsersInput } from "@/users/dtos/search-users.input";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user: UserType) {
    return this.usersService.findOneById(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [User]!)
  async searchUsers(@Args("data") data: SearchUsersInput, @CurrentUser() user: UserType) {
    return this.usersService.search(data, user.id);
  }
}
