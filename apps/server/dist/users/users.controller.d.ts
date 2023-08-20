/// <reference types="multer" />
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUserByName(name: string, authId: string): Promise<import("./user.entity").User[]>;
    getLoggedUserInfo(authId: string): Promise<import("./user.entity").User | null>;
    getUserById(id: string): Promise<import("./user.entity").User | null>;
    updateUser(body: UpdateUserDto, authId: string, file?: Express.Multer.File): Promise<import("./user.entity").User>;
}
//# sourceMappingURL=users.controller.d.ts.map