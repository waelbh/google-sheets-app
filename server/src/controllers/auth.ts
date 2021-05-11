import {
  COOKIE_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  REDIRECT_URI,
  SERVER_ROOT_URI,
  CLIENT_ROOT_URI,
} from "../config/config";
import { getGoogleAuthURL, getTokens } from "../helpers";
import jwt from "jsonwebtoken";

/**
 *
 * Generate google authentification/authorization url
 *
 */
export const getAuthUrl = async (req: any, res: any) => {
  try {
    return res.status(200).json(getGoogleAuthURL());
  } catch (error) {
    return res.status(400).json(error);
  }
};
/**
 *
 * used to get user  token and saved in user client cookies and redirect to client home page
 *
 */
export const getUserToken = async (req: any, res: any) => {
  try {
    const code = req.query.code as string;

    const tokenObject = await getTokens({
      code,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      redirectUri: `${SERVER_ROOT_URI}/${REDIRECT_URI}`,
    });
    const token = jwt.sign(JSON.stringify(tokenObject), JWT_SECRET);

    res.cookie(COOKIE_NAME, token, {
      maxAge: 900000,
      httpOnly: process.env.NODE_ENV === "production" ? true : false,
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    res.redirect(CLIENT_ROOT_URI);
  } catch (error) {
    return res.status(400).json(error);
  }
};
