import { google } from "googleapis";
import jwt from "jsonwebtoken";
import {
  COOKIE_NAME,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
  REDIRECT_URI,
  SERVER_ROOT_URI,
} from "../config/config";
/**
 * authorization function will intercept cookies from request to verify user token
 */
export const authorization = async (
  req: Record<string, any>,
  res: any,
  next: any
) => {
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `${SERVER_ROOT_URI}/${REDIRECT_URI}`
  );

  const decoded: any = await jwt.verify(req.cookies[COOKIE_NAME], JWT_SECRET);
  if (!decoded) return res.status(400).send({ authorization: false });
  oAuth2Client.setCredentials(decoded);
  req.oAuth2Client = oAuth2Client;
  return next();
};
