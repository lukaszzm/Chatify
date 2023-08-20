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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async signUp(credentials, file) {
        const { email, password, firstName, lastName } = credentials;
        const user = await this.usersService.findOneByMail(email, true);
        if (user) {
            throw new common_1.HttpException({ message: "This email is already used." }, 409);
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await this.usersService.create({ email, password: hashedPassword, firstName, lastName }, file);
        const payload = { sub: newUser.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async signIn(credentials) {
        const { email, password } = credentials;
        const user = await this.usersService.findOneByMail(email, true);
        if (!user) {
            throw new common_1.NotFoundException("This email is not connected to any account.");
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException("Your password is invalid.");
        }
        const payload = { sub: user.id };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map