"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.messagesRouter = void 0;
var messageControllers_1 = require("../controllers/messageControllers");
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
exports.messagesRouter = express_1["default"].Router();
exports.messagesRouter.use(auth_1.auth);
exports.messagesRouter.post("/", messageControllers_1.sendMessage);
exports.messagesRouter.get("/:id", messageControllers_1.getMessages);
exports.messagesRouter.get("/", messageControllers_1.getRecentMessages);
