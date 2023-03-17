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
exports.__esModule = true;
exports.getRecentMessages = exports.sendMessage = exports.getMessages = void 0;
var messages_1 = require("../models/messages");
var removeDuplications_1 = require("../utils/removeDuplications");
var getMessages = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, chatID, messages, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userID = req.body.id;
                chatID = req.params.id;
                return [4 /*yield*/, messages_1.Messages.find({
                        $or: [
                            {
                                $and: [
                                    {
                                        fromId: userID
                                    },
                                    {
                                        toId: chatID
                                    },
                                ]
                            },
                            {
                                $and: [
                                    {
                                        fromId: chatID
                                    },
                                    {
                                        toId: userID
                                    },
                                ]
                            },
                        ]
                    }).sort({ createdAt: 1 })];
            case 1:
                messages = _a.sent();
                res.json(messages);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getMessages = getMessages;
var sendMessage = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, text, fromId, toId, data, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, text = _a.text, fromId = _a.fromId, toId = _a.toId;
                return [4 /*yield*/, messages_1.Messages.create({
                        text: text,
                        fromId: fromId,
                        toId: toId,
                        createdAt: Date.now()
                    })];
            case 1:
                data = _b.sent();
                if (data)
                    return [2 /*return*/, res.status(201).json(data)];
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                next(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.sendMessage = sendMessage;
var getRecentMessages = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var ID, recentMessages, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                ID = req.body.id;
                return [4 /*yield*/, messages_1.Messages.aggregate([
                        { $match: { $or: [{ fromId: ID }, { toId: ID }] } },
                        { $sort: { createdAt: -1 } },
                        {
                            $group: {
                                _id: { $concat: ["$fromId", "$toId"] },
                                text: { $first: "$text" },
                                createdAt: {
                                    $first: "$createdAt"
                                },
                                fromId: {
                                    $first: "$fromId"
                                },
                                toId: {
                                    $first: "$toId"
                                }
                            }
                        },
                        { $sort: { createdAt: -1 } },
                        {
                            $addFields: {
                                fromId: { $toObjectId: "$fromId" },
                                toId: { $toObjectId: "$toId" }
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "fromId",
                                foreignField: "_id",
                                as: "fromIdUserInfo",
                                pipeline: [
                                    {
                                        $project: {
                                            firstName: 1,
                                            _id: 1,
                                            lastName: 1,
                                            profileImage: 1
                                        }
                                    },
                                ]
                            }
                        },
                        {
                            $lookup: {
                                from: "users",
                                localField: "toId",
                                foreignField: "_id",
                                as: "toIdUserInfo",
                                pipeline: [
                                    {
                                        $project: {
                                            firstName: 1,
                                            _id: 1,
                                            lastName: 1,
                                            profileImage: 1
                                        }
                                    },
                                ]
                            }
                        },
                    ])];
            case 1:
                recentMessages = _a.sent();
                recentMessages = (0, removeDuplications_1.removeDuplications)(ID, recentMessages);
                recentMessages.map(function (el) {
                    delete el.fromIdUserInfo;
                    delete el.toIdUserInfo;
                });
                res.json(recentMessages);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                next(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getRecentMessages = getRecentMessages;
