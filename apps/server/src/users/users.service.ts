import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Not, Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import bcrypt from "bcrypt";
import { CreateUserDto } from "./dtos/create-user.dto";
import { S3Service } from "./s3.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly s3Service: S3Service,
  ) {}

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

  findByName(fullName = "", id: string) {
    return this.usersRepository.find({
      where: {
        fullName: Like(`%${fullName}%`),
        id: Not(id),
      },
    });
  }

  async create(credentials: CreateUserDto, file?: Express.Multer.File) {
    const { firstName, lastName } = credentials;
    const fullName = `${firstName} ${lastName}`;

    if (file) {
      const { originalname, buffer } = file;
      const path = `${fullName}/${originalname}`;
      const url = await this.s3Service.upload(path, buffer);
      Object.assign(credentials, { profileImage: url });
    }

    const user = this.usersRepository.create({
      fullName,
      ...credentials,
    });
    return this.usersRepository.save(user);
  }

  async update(body: UpdateUserDto, id: string, file?: Express.Multer.File) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ["id", "firstName", "lastName", "fullName", "profileImage", "password"],
    });

    if (!user) throw new NotFoundException();

    const { currentPassword, newPassword, firstName, lastName } = body;

    if (currentPassword && newPassword) {
      const isValidPassword = await bcrypt.compare(currentPassword, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedException("Your current password is incorrect.");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      Object.assign(user, { password: hashedPassword });
    }

    Object.assign(user, firstName && { firstName }, lastName && { lastName });
    const fullName = `${user.firstName} ${user.lastName}`;

    if (file) {
      const { originalname, buffer } = file;
      const path = `${fullName}/${originalname}`;
      const url = await this.s3Service.upload(path, buffer);
      Object.assign(user, { profileImage: url });
    }

    Object.assign(user, { fullName: `${user.firstName} ${user.lastName}` });

    return this.usersRepository.save(user);
  }
}
