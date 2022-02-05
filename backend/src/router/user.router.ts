import { Router } from "express";
import UserContorller from "../controller/user.controller";

const userRouter = Router();

const uc = new UserContorller();

userRouter.route("").get(uc.get);

userRouter.route("/id/:id").delete(uc.delete);

userRouter.route("/register").post(uc.add);

userRouter.route("/update").patch(uc.update);

userRouter.route("/change").patch(uc.changePass);

userRouter.route("/login").post(uc.login);

userRouter.route("/logout").delete(uc.logout);

export { userRouter };
