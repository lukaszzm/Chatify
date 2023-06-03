import { HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import bcrypt from "bcrypt";
import { SignInCredentialsDto } from "./dtos/sign-in-credentials.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signUp(credentials: SignUpCredentialsDto) {
    // TODO: add support for file upload
    const { email, password, firstName, lastName, profileImage } = credentials;

    const user = await this.usersService.findOneByMail(email);
    if (user) {
      throw new HttpException({ message: "This email is already used." }, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({ email, password: hashedPassword, firstName, lastName });

    const payload = { sub: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(credentials: SignInCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.usersService.findOneByMail(email);
    if (!user) {
      throw new NotFoundException();
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
