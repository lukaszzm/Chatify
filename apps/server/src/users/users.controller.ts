import { Body, Controller, Get, Param, Patch } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Controller("users")
export class UsersController {
  @Get("name/:input")
  getUserByName(@Param("input") input: string) {
    return "User by name: " + input;
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    return "User by id: " + id;
  }

  @Patch()
  updateUserInfo(@Body() body: UpdateUserDto) {
    return "Patched user";
  }
}
