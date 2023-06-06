import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import bcrypt from "bcrypt";

// TODO: write it in another location
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

  findOneById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByMail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  findByName(fullName: string) {
    return this.usersRepository.find({
      where: {
        fullName: Like(`%${fullName}%`),
      },
    });
  }

  create(credentials: NewUser) {
    const { firstName, lastName } = credentials;
    const user = this.usersRepository.create({
      fullName: `${firstName} ${lastName}`,
      ...credentials,
    });
    return this.usersRepository.save(user);
  }

  async update(body: UpdateUserDto, id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException();

    const { currentPassword, newPassword, ...rest } = body;

    if (currentPassword && newPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedException();
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      Object.assign(user, { ...rest, password: hashedPassword });
    } else {
      Object.assign(user, { ...rest });
    }

    return this.usersRepository.save(user);
  }
}
