"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.fileUpload = void 0;
var multer_1 = __importDefault(require("multer"));
var multer_firebase_storage_1 = __importDefault(require("multer-firebase-storage"));
var MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg"
};
exports.fileUpload = (0, multer_1["default"])({
    storage: (0, multer_firebase_storage_1["default"])({
        bucketName: process.env.FIREBASE_BUCKET,
        credentials: {
            clientEmail: process.env.FIREBASE_EMAIL,
            privateKey: process.env.FIREBASE_KEY.replace(/\\n/g, "\n"),
            projectId: process.env.FIREBASE_ID
        },
        public: true,
        unique: true
    }),
    fileFilter: function (req, file, cb) {
        var isValid = !!MIME_TYPE_MAP[file.mimetype];
        var error = isValid ? null : new Error("Invalid type.");
        cb(error, isValid);
    }
});
