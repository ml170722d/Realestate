import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import Authenticator from "../util/auth";
import FileController from "../controllers/file.controller";
import UserController from "../controllers/user.controller";
import Logger from "js-logger";

const userStorage = multer.diskStorage({
  destination: (req, file, next) => {
    return next(null, "public/user");
  },
  filename: (req, file, next) => {
    let filename = "";
    let err: Error | null = null;
    try {
      const { username } = Authenticator.tokenData(
        Authenticator.getToken(req.headers)!
      );
      const extension = file.originalname.split(".")[1];

      filename = username.concat(".").concat(extension);
      req.body.username = username;
      req.body.success = true;
    } catch (error) {
      Logger.error(`${error}`);
      err = <Error>error;
    }
    return next(err, filename);
  },
});

const realestateStorage = multer.diskStorage({
  destination: (req, file, next) => {
    if (file) return next(null, "public/realestate");
    return next(new Error("Key 'realestate' not provided"), "");
  },
  filename: (req, file, next) => {
    let filename = "";
    let err: Error | null = null;
    try {
      const id = new mongoose.Types.ObjectId().toString();
      const extension = file.originalname.split(".")[1];

      filename = id + "." + extension;
      req.body.success = true;
    } catch (error) {
      Logger.error(`${error}`);
      err = <Error>error;
    }
    return next(err, filename);
  },
});

const userMulter = multer({
  storage: userStorage,
  limits: {
    fileSize: 1024 * 1024 * 4,
  },
});
const realestateMulter = multer({ storage: realestateStorage });

const fileRouter = express.Router();

fileRouter.use("/u", express.static("public/user"));

fileRouter.use("/re", express.static("public/realestate"));

fileRouter.route("/uploadProfilePicture").post(
  (req, res, next) => new Authenticator().authenticateToken(req, res, next),
  async (req, res, next) => {
    const isOnline = await UserController.isOnline(req);
    if (isOnline) return next();
    return res.sendStatus(401);
  },
  userMulter.single("img"),
  (req, res, next) => new UserController().updateUserImg(req, res, next),
  (req, res) => new FileController().assess(req, res)
);

export default fileRouter;
