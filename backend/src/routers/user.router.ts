import express from "express";
import UserController from "../controllers/user.controller";
import IResponce from "../interface/responce.interface";

const authRouter = express.Router();

authRouter.route("/login").post((req, res: express.Response<IResponce>) => {
  new UserController().login(req, res);
});

authRouter.route("/logout").delete((req, res: express.Response<IResponce>) => {
  new UserController().logout(req, res);
});

authRouter.route("/register").post((req, res: express.Response<IResponce>) => {
  new UserController().register(req, res);
});

const changeRouter = express.Router();

changeRouter
  .route("/password")
  .patch((req, res: express.Response<IResponce>) => {
    new UserController().changePass(req, res);
  });

const userRouter = express.Router();

userRouter.route("/user/:id").get((req, res) => {
  new UserController().get(req, res);
});

userRouter.route("/users").get((req, res) => {
  new UserController().all(req, res);
});

userRouter.use("/auth", authRouter);
userRouter.use("/change", changeRouter);

export { userRouter };
