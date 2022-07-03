import axios from "axios";

import { apiURL } from "/src/lib/functions/api";

import loginSchema from "/src/lib/functions/joiSchemas/login";

export async function reverifyUser(
  email: string,
  password: string
): Promise<string> {
  let messageStatus: string = "";

  try {
    await loginSchema.validateAsync({
      email: email,
      password: password,
    });
  } catch (error) {
    messageStatus = error;
    return messageStatus;
  }

  messageStatus = "loading . . .";

  await axios
    .post(`${apiURL}/auth/verify/resend`, {
      email: email,
      password: password,
    })
    .then(() => {
      location.replace("https://chat.kominekjan.cz/verify/reverify");
    })
    .catch((err) => {
      if (err.response) {
        messageStatus = err.response.data.error.message;
      }
    });

  return messageStatus;
}
