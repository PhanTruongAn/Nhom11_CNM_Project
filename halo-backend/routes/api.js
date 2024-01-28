import express from "express";
import userController from "../controllers/userController";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initAppRoutes = (app) => {
  router.post("/registry", userController.handlerRegistry);
  router.post("/login", userController.handleLogin);
  return app.use("/", router);
};
export default initAppRoutes;
