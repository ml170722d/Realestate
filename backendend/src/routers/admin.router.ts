import express from "express";
import AdminController from "../controllers/admin.controller";
import AgencyController from "../controllers/agency.controller";
import MicrolocationController from "../controllers/microlocation.controller";

const userRouter = express.Router();

userRouter.route("/grant").patch((req, res) => {
  new AdminController().grantAccess(req, res);
});

userRouter.route("/deny").patch((req, res) => {
  new AdminController().denyAccess(req, res);
});

userRouter.route("").delete((req, res) => {
  new AdminController().deleteUser(req, res);
});

userRouter.route("").post((req, res) => {
  new AdminController().addUser(req, res);
});

const agencyRouter = express.Router();

agencyRouter.route("").post((req, res) => {
  new AgencyController().add(req, res);
});

agencyRouter.route("").delete((req, res) => {
  new AgencyController().remove(req, res);
});

const mlRouter = express.Router();

mlRouter.route("").post((req, res) => {
  new MicrolocationController().add(req, res);
});

mlRouter.route("").delete((req, res) => {
  new MicrolocationController().remove(req, res);
});

const adminRouter = express.Router();

adminRouter.use("/user", userRouter);
adminRouter.use("/agency", agencyRouter);
adminRouter.use("/ml", mlRouter);

export { adminRouter };
