import { Router } from "express";
import FileController, { upload } from "../controller/file.controller";

const fileRouter = Router();

const fc = new FileController();

fileRouter.route("/user").patch(upload.single("user"), fc.uploadAvatar);

fileRouter.route("/post").patch(upload.array("post", 6), fc.uploadPostPic);

export { fileRouter };
