import Joi, { type ObjectSchema } from "joi";

const signupSchema: ObjectSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  display_name: Joi.string().alphanum().min(4).max(16).required(),
  password: Joi.string().min(6).max(50).required(),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export default signupSchema;
