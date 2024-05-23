import Joi from "joi";

export default () => ({
  database: {
    url: process.env.DATABASE_URL,
  },
});

export const validationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
});
