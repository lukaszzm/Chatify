import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";

interface NewUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByMail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  create(credentials: NewUser) {
    const user = this.usersRepository.create(credentials);
    return this.usersRepository.save(user);
  }
}
