"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Notes = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var noteSchema = new mongoose_1["default"].Schema({
    title: {
        type: String,
        required: true,
        maxLenght: 50
    },
    text: {
        type: String,
        required: true,
        maxLength: 1000
    },
    fromId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
}, { collection: "notes" });
exports.Notes = mongoose_1["default"].model("Notes", noteSchema);
