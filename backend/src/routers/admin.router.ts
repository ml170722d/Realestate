import express from "express";
import AdminController from "../controllers/admin.controller";
import { agencyRouter } from "./agency.router";
import { locRouter } from "./location.router";

const userRouter = express.Router();

userRouter.route("/grant").patch((req, res) => {
  new AdminController().grantAccess(req, res);
});

userRouter.route("/deny").patch((req, res) => {
  new AdminController().denyAccess(req, res);
});

userRouter.route("").delete((req, res) => {
  new AdminController().removeUser(req, res);
});

userRouter.route("").post((req, res) => {
  new AdminController().addUser(req, res);
});

const adminRouter = express.Router();

adminRouter.use("/user", userRouter);
adminRouter.use("/agency", agencyRouter);
adminRouter.use("/ml", locRouter);

export { adminRouter };
