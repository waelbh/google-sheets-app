export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  "474083889278-q5jdno95vi1okenl5hehcb8dip0ij6un.apps.googleusercontent.com";
export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET || "bwMAecWS02lUkI4v5xdW-tjq";
export const SCOPES =
  process.env.SCOPES ||
  "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets";
export const SERVER_ROOT_URI =
  process.env.SERVER_ROOT_URI || "http://localhost:4000";
export const CLIENT_ROOT_URI =
  process.env.CLIENT_ROOT_URI || "http://localhost:3000";
export const REDIRECT_URI = process.env.REDIRECT_URI || "auth/google";

export const JWT_SECRET = process.env.JWT_SECRET || "sheets";
export const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";

export const PORT = process.env.PORT || 4000;
