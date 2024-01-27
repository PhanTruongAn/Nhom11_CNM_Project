import express from "express";
import userController from "../controllers/userController";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initAppRoutes = (app) => {
  router.post("/registry", userController.handlerRegistry);
  return app.use("/", router);
};
export default initAppRoutes;
