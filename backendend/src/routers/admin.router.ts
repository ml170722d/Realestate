import express from "express";
import AdminController from "../controllers/admin.controller";

const userRouter = express.Router();

userRouter.route("/grant").patch((req, res) => {
  new AdminController().grantAccess(req, res);
});

userRouter.route("/deny").patch((req, res) => {
  new AdminController().denyAccess(req, res);
});

userRouter.route("/remove").delete((req, res) => {
  new AdminController().deleteUser(req, res);
});

userRouter.route("/add").post((req, res) => {
  new AdminController().addUser(req, res);
});

const agencyRouter = express.Router();

agencyRouter.route("/add").post((req, res) => {
  new AdminController().addAgency(req, res);
});

const adminRouter = express.Router();

adminRouter.use("/user", userRouter);
adminRouter.use("/agency", agencyRouter);

export { adminRouter };
