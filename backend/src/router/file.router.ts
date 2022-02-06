import { Router } from "express";
import FileController, { upload } from "../controller/file.controller";

const fileRouter = Router();

const fc = new FileController();

fileRouter.route("/user").patch(upload.single("pic"), fc.uploadAvatar);

fileRouter.route("/post").patch(upload.array("pics", 6), fc.uploadPostPic);

export { fileRouter };

// FIX server doesn't serve img for posts as it should (example: jpg), but svg file is provided
