"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.notesRouter = void 0;
var notesControllers_1 = require("../controllers/notesControllers");
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
exports.notesRouter = express_1["default"].Router();
exports.notesRouter.use(auth_1.auth);
exports.notesRouter.post("/", notesControllers_1.addNote);
exports.notesRouter["delete"]("/:id", notesControllers_1.deleteNote);
exports.notesRouter.get("/", notesControllers_1.getAllNotes);
exports.notesRouter.get("/:id", notesControllers_1.getNote);
