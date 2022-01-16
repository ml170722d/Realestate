import express from "express";
import UserController from "../controllers/user.controller";
import IResponce from "../interface/responce.interface";

const userRouter = express.Router();

userRouter.route("/login").post((req, res: express.Response<IResponce>) => {
  new UserController().login(req, res);
});

userRouter.route("/logout").delete((req, res: express.Response<IResponce>) => {
  new UserController().logout(req, res);
});

userRouter
  .route("/changePassword")
  .patch((req, res: express.Response<IResponce>) => {
    new UserController().changePass(req, res);
  });

userRouter.route("/register").post((req, res: express.Response<IResponce>) => {
  new UserController().register(req, res);
});

export { userRouter };
