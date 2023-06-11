import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import bcrypt from "bcrypt";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  findOneById(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByMail(email: string, includePassword = false) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        password: includePassword,
      },
    });
  }

  findByName(fullName = "") {
    return this.usersRepository.find({
      where: {
        fullName: Like(`%${fullName}%`),
      },
    });
  }

  create(credentials: CreateUserDto) {
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

    const { currentPassword, newPassword, firstName, lastName, ...rest } = body;

    if (currentPassword && newPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedException();
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      Object.assign(user, firstName && { firstName }, lastName && { lastName }, { password: hashedPassword, ...rest });
    } else {
      Object.assign(user, firstName && { firstName }, lastName && { lastName }, { ...rest });
    }

    Object.assign(user, { fullName: `${user.firstName} ${user.lastName}` });

    return this.usersRepository.save(user);
  }
}
