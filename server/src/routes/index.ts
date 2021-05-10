import auth from "./auth";
import sheets from "./sheets";
const routes = (app: any) => {
  app.use("/auth", auth);
  app.use("/sheets", sheets);
};
export default routes;
