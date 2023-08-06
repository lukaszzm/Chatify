import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
import { AuthId } from "../auth/decorators/auth-user.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";

@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUserByName(@Query("name") name: string, @AuthId() authId: string) {
    console.log("GET-USER-BY-NAME");
    console.log(name);
    console.log("-------------------------");
    return this.usersService.findByName(name, authId);
  }

  @Get("me")
  getLoggedUserInfo(@AuthId() authId: string) {
    console.log("GET-LOGGED-USER-INFO");
    console.log(authId);
    console.log("-------------------------");
    return this.usersService.findOneById(authId);
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    console.log("GET-USER-BY-ID");
    console.log(id);
    console.log("-------------------------");
    return this.usersService.findOneById(id);
  }

  @Patch("me")
  @UseInterceptors(FileInterceptor("profileImage"))
  updateUser(
    @Body() body: UpdateUserDto,
    @AuthId() authId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: ".(png|jpeg|jpg)" }),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    console.log("UPDATE-USER");
    console.log(body);
    console.log(file);
    console.log("auth id: " + authId);
    console.log("-------------------------");
    return this.usersService.update(body, authId, file);
  }
}
