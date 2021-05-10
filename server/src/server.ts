import express from "express";
import cors from "cors";
import routes from "./routes";
import { CLIENT_ROOT_URI } from "./config/config";
import cookieParser from "cookie-parser";
const port = 4000;

const app = express();
// cors policy allow front origin
app.use(
  cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: CLIENT_ROOT_URI,
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
  })
);
// to access cockies authorization middleware
app.use(cookieParser());
// all available routes
routes(app);
app.listen(port, () => {
  console.log(`App listening on port : ${port}`);
});
