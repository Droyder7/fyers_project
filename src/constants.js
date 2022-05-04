import { generateRandomString } from "./utility/random";

const clientId = process.env.REACT_APP_CLIENT_ID;
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
export const state = generateRandomString(6);

export const fyersAuthTokenUrl = `https://api.fyers.in/api/v2/generate-authcode?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}`;

export const fyersValidateAuthcode = `https://api.fyers.in/api/v2/validate-authcode`;