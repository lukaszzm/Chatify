"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Messages = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var messageSchema = new mongoose_1["default"].Schema({
    text: {
        type: String,
        required: true,
        maxLength: 250
    },
    fromId: {
        type: String,
        required: true
    },
    toId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, { collection: "messages" });
exports.Messages = mongoose_1["default"].model("Messages", messageSchema);
