import axios from "axios";

import { apiURL } from "/src/lib/functions/api";

export async function isUserLoggedIn(): Promise<{
  display: boolean;
  loggedUser: boolean;
  messageStatus: string;
}> {
  let messageStatus: string = "";
  let display: boolean = false;
  let loggedUser: boolean = false;

  const token: string = localStorage.getItem("jwt_token");

  if (!(token == null)) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post(`${apiURL}/auth/isloggedin`, {}, config)
      .then(() => {
        display = true;
        loggedUser = true;
        messageStatus = "";
      })
      .catch((err) => {
        display = true;
        loggedUser = false;
        if (err.response) {
          messageStatus = err.response.data.error.message;
        }
      });
  } else {
    display = true;
    loggedUser = false;
  }

  return {
    display,
    loggedUser,
    messageStatus,
  };
}
