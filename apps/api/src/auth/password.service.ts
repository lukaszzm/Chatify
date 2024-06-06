import { Injectable } from "@nestjs/common";
import { hash, verify } from "argon2";

@Injectable()
export class PasswordService {
  async hash(plainPassword: string): Promise<string> {
    return hash(plainPassword);
  }

  async verify(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return verify(hashedPassword, plainPassword);
  }
}
