import { Body, Controller, Get, Param, Patch, Query, UseGuards } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { AuthId } from "../auth/decorators/auth-user.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUserByName(@Query("name") name: string) {
    return this.usersService.findByName(name);
  }

  @Get("me")
  getLoggedUserInfo(@AuthId() authId: string) {
    return this.usersService.findOneById(authId);
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch("me")
  updateUser(@Body() body: UpdateUserDto, @AuthId() authId: string) {
    return this.usersService.update(body, authId);
  }
}
