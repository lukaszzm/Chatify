"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const s3_service_1 = require("./s3.service");
let UsersService = class UsersService {
    constructor(usersRepository, s3Service) {
        this.usersRepository = usersRepository;
        this.s3Service = s3Service;
    }
    findOneById(id) {
        return this.usersRepository.findOneBy({ id });
    }
    findOneByMail(email, includePassword = false) {
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
    findByName(fullName = "", id) {
        return this.usersRepository.find({
            where: {
                fullName: (0, typeorm_2.Like)(`%${fullName}%`),
                id: (0, typeorm_2.Not)(id),
            },
        });
    }
    async create(credentials, file) {
        const { firstName, lastName } = credentials;
        const fullName = `${firstName} ${lastName}`;
        if (file) {
            const { originalname, buffer } = file;
            const path = `${fullName}/${originalname}`;
            const url = await this.s3Service.upload(path, buffer);
            Object.assign(credentials, { profileImage: url });
        }
        const user = this.usersRepository.create(Object.assign({ fullName }, credentials));
        return this.usersRepository.save(user);
    }
    async update(body, id, file) {
        const user = await this.usersRepository.findOne({
            where: { id },
            select: ["id", "firstName", "lastName", "fullName", "profileImage", "password"],
        });
        if (!user)
            throw new common_1.NotFoundException();
        const { currentPassword, newPassword, firstName, lastName } = body;
        if (currentPassword && newPassword) {
            const isValidPassword = await bcrypt_1.default.compare(currentPassword, user.password);
            if (!isValidPassword) {
                throw new common_1.UnauthorizedException("Your current password is incorrect.");
            }
            const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        s3_service_1.S3Service])
], UsersService);
//# sourceMappingURL=users.service.js.map