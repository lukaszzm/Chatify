/// <reference types="multer" />
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { S3Service } from "./s3.service";
export declare class UsersService {
    private usersRepository;
    private readonly s3Service;
    constructor(usersRepository: Repository<User>, s3Service: S3Service);
    findOneById(id: string): Promise<User | null>;
    findOneByMail(email: string, includePassword?: boolean): Promise<User | null>;
    findByName(fullName: string | undefined, id: string): Promise<User[]>;
    create(credentials: CreateUserDto, file?: Express.Multer.File): Promise<User>;
    update(body: UpdateUserDto, id: string, file?: Express.Multer.File): Promise<User>;
}
//# sourceMappingURL=users.service.d.ts.map