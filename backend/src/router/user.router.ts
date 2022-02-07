import { Router } from "express";
import AdminController from "../controller/admin.controller";
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

const ac = new AdminController();

userRouter.route("/grant").patch(ac.grant);

userRouter.route("/deny").patch(ac.deny);

export { userRouter };
