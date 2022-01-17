import multer from "multer";
import express from "express";
import IResponce from "../interface/responce.interface";
import IUser from "../interface/user.interface";
import Logger from "js-logger";
import User from "../models/user";
import Host from "../util/host";

const userDisk = multer.diskStorage({
  destination: "public/u",
  filename: (req, file, next) => {
    const user: IUser = req.body;
    const splited = file.originalname.split(".");
    const extension = splited[splited.length - 1] || null;
    if (!user.id || !extension) next(new Error("Invalid parameters!"), "");

    const filename = user.id + "." + extension;
    return next(null, filename);
  },
});

const userMulter = multer({ storage: userDisk });

export default class FileController {
  async uploadAvatar(req: express.Request, res: express.Response<IResponce>) {
    Logger.debug(req.file);

    const user: IUser = req.body;
    const path = req.file?.path.replace(/\\/g, "/");
    const update: IUser = {
      imgUrl: Host.getHostUrl() + "/" + path,
    };

    try {
      const result: IUser = await User.findByIdAndUpdate(user.id, update);

      if (result) return res.status(200).json({ body: update.imgUrl });
      return res.status(400).json({ msg: "User was not found" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(400).json({});
    }
  }
}

export { userMulter };
