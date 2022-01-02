import express from "express";
import UserController from "../controllers/user.controller";
import Authenticator from "../util/auth";

const userRouter = express.Router();

userRouter.route("/login").post(
  (req, res, next) => new Authenticator().authenticateToken(req, res, next),
  (req, res) => {
    new UserController().login(req, res);
  }
);

userRouter.route("/register").post(new UserController().register);

userRouter.route("/blockAccess").post(
  (req, res, next) => new Authenticator().authenticateToken(req, res, next),
  (req, res) => new UserController().blockAccess(req, res)
);

userRouter.route("/deleteUser").post(
  (req, res, next) => new Authenticator().authenticateToken(req, res, next),
  (req, res) => new UserController().deleteUser(req, res)
);

userRouter.route("/grantAccess").post(
  (req, res, next) => new Authenticator().authenticateToken(req, res, next),
  (req, res) => new UserController().grantAccess(req, res)
);

userRouter.route("/getAllUsers").get(
  (req, res, next) => new Authenticator().authenticateToken(req, res, next),
  (req, res) => new UserController().getAllUsers(req, res)
);

export default userRouter;
