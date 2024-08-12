import type { User as UserType } from "@chatify/db";
import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { UpdatePasswordInput } from "@/users/dtos/update-password.input";
import { UpdateProfileInput } from "@/users/dtos/update-profile.input";
import { UsersArgs } from "@/users/dtos/users.args";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async me(@CurrentUser() me: UserType) {
    return this.usersService.findOneById(me.id);
  }

  @Query(() => [User])
  async users(@Args() args: UsersArgs, @CurrentUser() me: UserType) {
    return this.usersService.findMany(args, me.id);
  }

  @Mutation(() => User)
  async updateProfile(
    @Args("data") data: UpdateProfileInput,
    @CurrentUser() me: UserType
  ) {
    return this.usersService.update(data, me.id);
  }

  @Mutation(() => User)
  async updatePassword(
    @Args("data") data: UpdatePasswordInput,
    @CurrentUser() me: UserType
  ) {
    return this.usersService.updatePassword(data, me.id);
  }

  @Mutation(() => User)
  async deleteAccount(@CurrentUser() me: UserType) {
    return this.usersService.delete(me.id);
  }
}
