"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.auth = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var JWT_TOKEN = process.env.JWT_TOKEN;
var auth = function (req, res, next) {
    try {
        var token = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : undefined;
        if (!token) {
            throw new Error();
        }
        var decodedToken = jsonwebtoken_1["default"].verify(token, JWT_TOKEN);
        req.body.id = decodedToken;
        next();
    }
    catch (_a) {
        res.status(401).send("Authorization Error.");
    }
};
exports.auth = auth;
