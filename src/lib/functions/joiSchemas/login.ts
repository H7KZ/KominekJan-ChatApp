import Joi, { type ObjectSchema } from "joi";

const loginSchema: ObjectSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).max(50).required(),
});

export default loginSchema;
