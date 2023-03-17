"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Users = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1["default"].Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 25
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 25
    },
    profileImage: {
        type: String,
        required: false
    }
}, { collection: "users" });
exports.Users = mongoose_1["default"].model("Users", userSchema);
