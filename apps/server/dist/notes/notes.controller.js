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
exports.NotesController = void 0;
const common_1 = require("@nestjs/common");
const create_note_dto_1 = require("./dtos/create-note.dto");
const notes_service_1 = require("./notes.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const auth_user_decorator_1 = require("../auth/decorators/auth-user.decorator");
let NotesController = exports.NotesController = class NotesController {
    constructor(notesService) {
        this.notesService = notesService;
    }
    getAllNotes(authId) {
        return this.notesService.findAll(authId);
    }
    createNote(body, authId) {
        return this.notesService.create(body, authId);
    }
    getNoteById(noteId, authId) {
        return this.notesService.findOne(noteId, authId);
    }
    deleteNoteById(noteId, authId) {
        return this.notesService.delete(noteId, authId);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, auth_user_decorator_1.AuthId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "getAllNotes", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_user_decorator_1.AuthId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_note_dto_1.CreateNoteDto, String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "createNote", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, auth_user_decorator_1.AuthId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "getNoteById", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, auth_user_decorator_1.AuthId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NotesController.prototype, "deleteNoteById", null);
exports.NotesController = NotesController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)("notes"),
    __metadata("design:paramtypes", [notes_service_1.NotesService])
], NotesController);
//# sourceMappingURL=notes.controller.js.map