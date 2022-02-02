import express from "express";
import FileController, { userMulter } from "../controllers/file.controller";
import IResponce from "../interface/responce.interface";

const avatarRouter = express.Router();

avatarRouter
  .route("/upload")
  .patch(
    userMulter.single("avatar"),
    (req, res: express.Response<IResponce>) => {
      new FileController().uploadAvatar(req, res);
    }
  );

const fileRouter = express.Router();
fileRouter.use("/avatar", avatarRouter);

const publicRouter = express.Router();
publicRouter.use("/public", express.static("public"));

export { fileRouter, publicRouter };
