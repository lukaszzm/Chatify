"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.usersRouter = void 0;
var userControllers_1 = require("../controllers/userControllers");
var auth_1 = require("../middleware/auth");
var uploadImage_1 = require("../middleware/uploadImage");
var express_1 = __importDefault(require("express"));
exports.usersRouter = express_1["default"].Router();
exports.usersRouter.use(auth_1.auth);
exports.usersRouter.get("/id/:id", userControllers_1.getUserById);
exports.usersRouter.get("/name/:input", userControllers_1.getUserByName);
exports.usersRouter.patch("/first-name/:firstName", userControllers_1.updateFirstName);
exports.usersRouter.patch("/last-name/:lastName", userControllers_1.updateLastName);
exports.usersRouter.patch("/password", userControllers_1.updatePassword);
exports.usersRouter.patch("/profile-image/", uploadImage_1.fileUpload.single("profileImage"), userControllers_1.updateProfileImage);
