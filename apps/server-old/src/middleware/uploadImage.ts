import multer from "multer";
import FirebaseStorage from "multer-firebase-storage";

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

export const fileUpload = multer({
  storage: FirebaseStorage({
    bucketName: process.env.FIREBASE_BUCKET_DEPRECATED,
    credentials: {
      clientEmail: process.env.FIREBASE_EMAIL_DEPRECATED,
      privateKey: process.env.FIREBASE_KEY_DEPRECATED!.replace(/\\n/g, "\n"),
      projectId: process.env.FIREBASE_ID_DEPRECATED,
    },
    public: true,
    unique: true,
  }),
  fileFilter: (req: any, file: any, cb: any) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid type.");
    cb(error, isValid);
  },
});
