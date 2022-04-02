import Joi from 'joi';

const signupSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(6).max(50).required()
});

export default signupSchema;
