import Joi from "joi";

const signupSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	display_name: Joi.string().alphanum().min(4).max(16).required(),
	password: Joi.string().min(6).max(50).required(),
	confirmPassword: Joi.ref("password"),
});

export default signupSchema;
