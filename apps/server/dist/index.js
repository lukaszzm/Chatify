"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var express_1 = __importDefault(require("express"));
var socket_io_1 = require("socket.io");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var routes_1 = require("./routes");
console.log(process.env.DB_USER);
var port = process.env.PORT || 8000;
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(express_1["default"].json());
var server = app.listen(port, function () { return console.log("SERVER STARTED ON ".concat(port)); });
var mongoDB = "mongodb+srv://".concat(process.env.DB_USER, ":").concat(process.env.DB_PASSWORD, "@chatify.5xwhr.mongodb.net/").concat(process.env.DB_NAME, "?retryWrites=true&w=majority");
mongoose_1["default"]
    .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function () {
    console.log("DB CONNECTED");
})["catch"](function (err) { return console.log(err); });
app.use("/uploads/images", express_1["default"].static(path_1["default"].join("uploads", "images")));
app.use("/api/auth", routes_1.authRouter);
app.use("/api/users", routes_1.usersRouter);
app.use("/api/messages", routes_1.messagesRouter);
app.use("/api/notes", routes_1.notesRouter);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
var onlineUsers = new Map();
io.on("connection", function (socket) {
    socket.on("add-user", function (userID) {
        onlineUsers.set(userID, socket.id);
    });
    socket.on("send-message", function (data) {
        var sendUserToken = onlineUsers.get(data.toId);
        if (sendUserToken !== undefined) {
            socket.to(sendUserToken).emit("receive-message", data);
        }
    });
});
app.use(function (err, req, res, next) {
    if (req.file) {
        fs_1["default"].unlink(req.file.path, function () {
            return;
        });
    }
    if (err) {
        return res
            .status(500)
            .send(err.message || "Something went wrong. Try again later.");
    }
    return res.status(404).send("Not Found.");
});
module.exports = app;
