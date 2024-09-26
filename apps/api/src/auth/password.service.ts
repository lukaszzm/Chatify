import { Injectable } from "@nestjs/common";
import { hash, verify } from "argon2";

@Injectable()
export class PasswordService {
  async hash(plainPassword: string) {
    return hash(plainPassword);
  }

  async verify(hashedPassword: string, plainPassword: string) {
    return verify(hashedPassword, plainPassword);
  }
}
