import express from "express";
import userController from "../controllers/userController";
import { checkCookie } from "../middleware/jwtMiddleware";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initAppRoutes = (app) => {
  router.post("/registry", userController.handlerRegistry);
  router.post("/login", userController.handleLogin);
  router.get("/login-user", checkCookie, userController.handlerLoginUser);
  return app.use("/", router);
};
export default initAppRoutes;
