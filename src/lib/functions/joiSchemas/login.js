import Joi from "joi";

const loginSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).max(50).required(),
});

export default loginSchema;
