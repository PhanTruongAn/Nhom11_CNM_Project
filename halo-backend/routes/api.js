import express from "express";
import userController from "../controllers/userController";
import userService from "../services/userServices";
// import { checkCookie } from "../middleware/jwtMiddleware";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initAppRoutes = (app) => {
  router.post("/checkValidate", userController.handlerCheckValidate);
  router.post("/registry", userController.handlerRegistry);
  router.post("/login", userController.handleLogin);
  // router.get("/login-user", checkCookie, userController.handlerLoginUser);
  router.post("/searchByPhone", userController.handlerSearchByPhone);
  router.post("/update-user", userController.handlerUpdateUser);
  router.post("/change-password", userController.handlerChangePassword);
  router.post("/confirm-account", userController.handleConfirmAccount);
  router.post("/new-otp", userController.handlerNewOtp);
  router.post("/forgot-password", userController.handlerForgotPassword);
  return app.use("/", router);
};
export default initAppRoutes;
