import { HttpException, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(credentials: SignUpCredentialsDto) {
    const { email, password, firstName, lastName, profileImage } = credentials;

    const user = await this.usersService.find(email);
    if (user.length > 0) {
      throw new HttpException({ message: "This email is already used." }, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersService.create({ email, password, firstName, lastName });
  }
}
