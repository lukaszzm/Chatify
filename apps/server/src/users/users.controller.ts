import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { AuthId } from "../auth/decorators/auth-user.decorator";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: better query for searching by firstName and/or lastName
  @Get("name/:input")
  getUserByName(@Param("input") input: string) {
    return this.usersService.findByName(input);
  }

  @Get("me")
  getLoggedUser(@AuthId() id: string) {
    return this.usersService.findOneById(id);
  }

  @Patch("me")
  updateUser(@Body() body: UpdateUserDto, @AuthId() id: string) {
    return this.usersService.update(body, id);
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return this.usersService.findOneById(id);
  }
}
