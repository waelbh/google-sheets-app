import {
  GOOGLE_CLIENT_ID,
  REDIRECT_URI,
  SERVER_ROOT_URI,
  SCOPES,
} from "../config/config";
import querystring from "querystring";
import axios from "axios";

/**
 * generate google auth url with specific scopes permissions
 */
export const getGoogleAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: SCOPES,
  };
  return `${rootUrl}?${querystring.stringify(options)}`;
};
/*
 *  get user token to access fetch/update profile, google sheets and google drive API
 *
 */
export function getTokens({
  code,
  clientId,
  clientSecret,
  redirectUri,
}: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<{
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}> {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
  };
  return axios
    .post(url, querystring.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch auth tokens`);
      console.log(error);
    });
}

/*
 * convert string[][] to Object[]
 */
export const arrayOfArrayStringsToArrayOfObjects = (arrayString: any) => {
  let result: Array<Object> = [];
  for (let index = 1; index < arrayString.length; index++) {
    result.push(arrayToObject(arrayString[index], arrayString[0]));
  }
  return result;
};
/*
 * convert string[] to Object
 */
const arrayToObject = (array: Array<string>, keysArray: Array<string>) => {
  let result: Object = {};
  array.forEach((a, idx) => {
    result = { ...result, [keysArray[idx]]: a };
  });
  return result;
};
