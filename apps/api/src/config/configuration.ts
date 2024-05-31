import Joi from "joi";

export default () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationTime: process.env.JWT_ACCESS_EXPIRATION_TIME,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpirationTime: process.env.JWT_REFRESH_EXPIRATION_TIME,
  },
});

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION_TIME: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRATION_TIME: Joi.string().required(),
});
