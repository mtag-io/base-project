import { SERVER_URL } from "./server.config";
import { AUTH, EMAIL_VERIFY_EMAIL, RESET_PASSWORD, SLASH, USER } from "../@constants";

// TODO put this in the global.json config file
export const ENDPOINTS = {
  [AUTH]: [SERVER_URL, AUTH].join(SLASH),
  [USER]: [SERVER_URL, USER].join(SLASH),
  [EMAIL_VERIFY_EMAIL]: [SERVER_URL, AUTH, EMAIL_VERIFY_EMAIL].join(SLASH),
  [RESET_PASSWORD]: [SERVER_URL, AUTH, RESET_PASSWORD].join(SLASH)
};