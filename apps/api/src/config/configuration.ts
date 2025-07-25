import Joi from "joi";

export default () => ({
  port: process.env.PORT,
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expirationTime: process.env.JWT_EXPIRATION_TIME,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
  },
  upload: {
    maxFileSize: process.env.UPLOAD_MAX_FILE_SIZE,
    maxFiles: process.env.UPLOAD_MAX_FILES,
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3: {
      region: process.env.AWS_S3_REGION,
      bucketName: process.env.AWS_S3_BUCKET_NAME,
    },
  },
});

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().default(3000),
  CORS_ORIGIN: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRATION_TIME: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
  UPLOAD_MAX_FILE_SIZE: Joi.number().default(4000000),
  UPLOAD_MAX_FILES: Joi.number().default(1),
  REDIS_URL: Joi.string().required(),
  AWS_ACCESS_KEY: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_S3_REGION: Joi.string().required(),
  AWS_S3_BUCKET_NAME: Joi.string().required(),
});
