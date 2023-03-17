"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.authRouter = exports.usersRouter = exports.messagesRouter = exports.notesRouter = void 0;
var notes_1 = require("./notes");
__createBinding(exports, notes_1, "notesRouter");
var messages_1 = require("./messages");
__createBinding(exports, messages_1, "messagesRouter");
var users_1 = require("./users");
__createBinding(exports, users_1, "usersRouter");
var auth_1 = require("./auth");
__createBinding(exports, auth_1, "authRouter");
