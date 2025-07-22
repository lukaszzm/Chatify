import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { CurrentUser } from "@/auth/decorators/current-user.decorator";
import { GqlAuthGuard } from "@/auth/guards/gql-auth.guard";
import { UpdatePasswordInput } from "@/users/dtos/update-password.input";
import { UpdateProfileInfoInput } from "@/users/dtos/update-profile-info.input";
import { UpdateProfilePictureInput } from "@/users/dtos/update-profile-picture.input";
import { UsersArgs } from "@/users/dtos/users.args";
import { User } from "@/users/models/user.model";
import { UsersService } from "@/users/users.service";

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async me(@CurrentUser() me: User) {
    return this.usersService.findOneById(me.id);
  }

  @Query(() => [User])
  async users(@Args() args: UsersArgs, @CurrentUser() me: User) {
    return this.usersService.search(args, me.id);
  }

  @Mutation(() => User)
  async updateInfo(@Args("data") data: UpdateProfileInfoInput, @CurrentUser() me: User) {
    return this.usersService.updateInfo(data, me.id);
  }

  @Mutation(() => User)
  async updateProfilePicture(
    @Args("data") data: UpdateProfilePictureInput,
    @CurrentUser() me: User
  ) {
    return this.usersService.updateProfilePicture(data.file ?? null, me.id);
  }

  @Mutation(() => User)
  async updatePassword(@Args("data") data: UpdatePasswordInput, @CurrentUser() me: User) {
    return this.usersService.updatePassword(data, me.id);
  }

  @Mutation(() => User)
  async deleteAccount(@CurrentUser() me: User) {
    return this.usersService.delete(me.id);
  }
}
