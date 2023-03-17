"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authRouter = void 0;
var authControllers_1 = require("../controllers/authControllers");
var uploadImage_1 = require("../middleware/uploadImage");
var express_1 = __importDefault(require("express"));
exports.authRouter = express_1["default"].Router();
exports.authRouter.post("/login/", authControllers_1.login);
exports.authRouter.post("/register/", uploadImage_1.fileUpload.single("profileImage"), authControllers_1.register);
