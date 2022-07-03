import Joi, { type ObjectSchema } from "joi";

const messageSchema: ObjectSchema = Joi.object({
  messageText: Joi.string().max(500).required(),
  room_id: Joi.number().required(),
});

export default messageSchema;
