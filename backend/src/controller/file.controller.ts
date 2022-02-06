import multer from "multer";
import IUser from "../interface/user.interface";
import { Request, Response, Express } from "express";
import IResponce from "../interface/responce.interface";
import Logger from "js-logger";
import Host from "../util/host";
import userSchema from "../shema/user.schema";
import IPost from "../interface/post.interface";
import crypto from "crypto";
import postSchema from "../shema/post.schema";
import internal from "stream";

const disk = multer.diskStorage({
  destination: (req, file, next) => {
    const route = req.url.split("/");
    switch (route[route.length - 1]) {
      case "user":
        return next(null, "public/u");
      case "post":
        return next(null, "public/re");
      default:
        return next(new Error("Unknown route"), "");
    }
  },
  filename: async (req, file, next) => {
    const route = req.url.split("/");
    switch (route[route.length - 1]) {
      case "user":
        return userPic(req, file, next);
      case "post":
        return await postPisc(req, file, next);
      default:
        return next(new Error("Unknown route"), "");
    }
  },
});

function userPic(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) {
  const user: IUser = req.body;
  const splited = file.originalname.split(".");
  const extension = splited[splited.length - 1] || null;
  if (!user.id || !extension) callback(new Error("Invalid parameters!"), "");

  const filename = user.id + "." + extension;
  return callback(null, filename);
}

async function postPisc(
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void
) {
  const post: IPost = req.body;
  const splited = file.originalname.split(".");
  const extension = splited[splited.length - 1] || null;
  if (!post.id || !extension) callback(new Error("Invalid parameters!"), "");

  const data = await streamToString(file.stream);
  const hash = crypto.createHash("sha256").update(data).digest("hex");

  const filename = post.id + "_" + hash + "." + extension;
  return callback(null, filename);
}

async function streamToString(stream: internal.Readable) {
  const chunks: any[] = [];
  return new Promise<string>((res, rej) => {
    stream.on("data", (chunk) => {
      chunks.push(chunk);
    });
    stream.on("end", () => {
      res(Buffer.concat(chunks).toString());
    });
  });
}

const upload = multer({ storage: disk });

export default class FileController {
  async uploadAvatar(req: Request, res: Response<IResponce>) {
    Logger.debug(req.file);

    const user: IUser = req.body;
    const path = req.file?.path.replace(/\\/g, "/");
    const update: IUser = {
      imgUrl: Host.getHostUrl() + "/" + path,
    };

    try {
      const result: IUser = await userSchema.findByIdAndUpdate(
        user.id,
        update,
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({ body: result.imgUrl });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }

  async uploadPostPic(req: Request, res: Response<IResponce>) {
    Logger.debug(req.files);

    const post: IPost = req.body;
    if (!req.files) return res.status(400).json({});

    const paths: string[] = (<any[]>req.files).map((f) =>
      f.path.replace(/\\/g, "/")
    );

    const update: IPost = {
      pics: paths.map((path) => Host.getHostUrl() + "/" + path),
    };

    try {
      const result: IPost = await postSchema.findByIdAndUpdate(
        post.id,
        update,
        {
          runValidators: true,
          new: true,
        }
      );

      return res.status(200).json({ body: result.pics });
    } catch (error) {
      Logger.error(`${error}`);
      return res.status(500).json({});
    }
  }
}

export { upload };
