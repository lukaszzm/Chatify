import type { User as UserType } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { UsersArgs } from "@/users/dtos/users.args";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [User]!)
  async users(@Args() args: UsersArgs, @CurrentUser() user: UserType) {
    return this.usersService.findMany(args, user.id);
  }
}
