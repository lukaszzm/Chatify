import { HttpException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { SignUpCredentialsDto } from "./dtos/sign-up-credentials.dto";
import bcrypt from "bcrypt";
import { SignInCredentialsDto } from "./dtos/sign-in-credentials.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signUp(credentials: SignUpCredentialsDto, file?: Express.Multer.File) {
    const { email, password, firstName, lastName } = credentials;
    const user = await this.usersService.findOneByMail(email, true);
    if (user) {
      throw new HttpException({ message: "This email is already used." }, 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.usersService.create({ email, password: hashedPassword, firstName, lastName }, file);

    const payload = { sub: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(credentials: SignInCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.usersService.findOneByMail(email, true);
    if (!user) {
      throw new NotFoundException("This email is not connected to any account.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException("Your password is invalid.");
    }

    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
