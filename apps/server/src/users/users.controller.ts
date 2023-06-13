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
    return this.usersService.update(body, authId, file);
  }
}
