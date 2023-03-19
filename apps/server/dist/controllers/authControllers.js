"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.register = exports.login = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var users_1 = require("../models/users");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var JWT_TOKEN = process.env.JWT_TOKEN;
var DEFAULT_PROFILE_PATH = process.env.DEFAULT_PROFILE_PATH;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, fixedEmail, user, match, id, token, firstName, lastName, profileImage, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = req.body, email = _a.email, password = _a.password;
                fixedEmail = email.toLowerCase();
                return [4 /*yield*/, users_1.Users.findOne({ email: fixedEmail })];
            case 1:
                user = _b.sent();
                if (!user)
                    return [2 /*return*/, res.status(401).send("Your mail is incorrect.")];
                return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
            case 2:
                match = _b.sent();
                if (!match)
                    return [2 /*return*/, res.status(401).send("Your password is incorrect.")];
                id = user._id.toString();
                token = void 0;
                try {
                    token = jsonwebtoken_1["default"].sign(id, JWT_TOKEN);
                }
                catch (err) {
                    throw new Error("Something went wrong.");
                }
                firstName = user.firstName, lastName = user.lastName, profileImage = user.profileImage;
                res.send({ id: id, token: token, firstName: firstName, lastName: lastName, profileImage: profileImage });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, profileImage, _a, firstName, lastName, newUser, id, token, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                email = req.body.email.toLowerCase();
                return [4 /*yield*/, users_1.Users.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (user)
                    throw new Error("This email is already used!");
                profileImage = req.file ? req.file.path : DEFAULT_PROFILE_PATH;
                _a = req.body, firstName = _a.firstName, lastName = _a.lastName;
                newUser = new users_1.Users({
                    email: email,
                    password: bcryptjs_1["default"].hashSync(req.body.password, 12),
                    firstName: firstName,
                    lastName: lastName,
                    profileImage: profileImage
                });
                newUser.save();
                id = newUser._id.toString();
                token = void 0;
                try {
                    token = jsonwebtoken_1["default"].sign(id, JWT_TOKEN);
                }
                catch (err) {
                    throw new Error("Something went wrong.");
                }
                return [2 /*return*/, res
                        .status(201)
                        .send({ id: id, token: token, firstName: firstName, lastName: lastName, profileImage: profileImage })];
            case 2:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.register = register;