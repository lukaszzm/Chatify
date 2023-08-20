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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./message.entity");
const typeorm_2 = require("typeorm");
let MessagesService = exports.MessagesService = class MessagesService {
    constructor(messagesRepository) {
        this.messagesRepository = messagesRepository;
    }
    async create(body, fromId) {
        const { toId, text } = body;
        const newMessage = await this.messagesRepository.create({
            from: {
                id: fromId,
            },
            to: {
                id: toId,
            },
            text,
        });
        const { id } = await this.messagesRepository.save(newMessage);
        return this.messagesRepository.findOne({
            where: {
                id,
            },
            relations: ["from", "to"],
        });
    }
    findMessagesBetweenUsers(firstUserId, secondUserId) {
        return this.messagesRepository.find({
            where: [
                {
                    from: {
                        id: firstUserId,
                    },
                    to: {
                        id: secondUserId,
                    },
                },
                {
                    from: {
                        id: secondUserId,
                    },
                    to: {
                        id: firstUserId,
                    },
                },
            ],
        });
    }
    async findRecentMessages(userId) {
        return this.messagesRepository.query(`SELECT sub.*
    FROM (
        SELECT DISTINCT ON (CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END)
            m.id,
            CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END AS "userId",
            m.text,
            m."createdAt",
            m."fromId",
            m."toId",
            u."profileImage",
            u."fullName"
        FROM message m
        LEFT JOIN "user" u ON CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END = u.id
        WHERE "fromId" = '${userId}' OR "toId" = '${userId}'
        ORDER BY
            CASE WHEN "fromId" = '${userId}' THEN "toId" ELSE "fromId" END,
            "createdAt" DESC
    ) sub
    ORDER BY "createdAt" DESC;`);
    }
};
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessagesService);
//# sourceMappingURL=messages.service.js.map