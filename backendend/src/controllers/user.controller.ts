import express from "express";
import Logger from "js-logger";
import User from "../models/user";
import Pending from "../models/pending";
import Authenticator from "../util/auth";
import ICookieData from "../interface/cookie.interface";
import Session from "../models/session";
import IUser from "../interface/user.interface";
import IPending from "../interface/pending.interfece";

export default class UserController {
  async login(req: express.Request, res: express.Response) {
    const cookieData: ICookieData = req.body.cookieData;
    const userInfo: IUser = req.body;

    if (cookieData) {
      try {
        const token = Authenticator.getToken(req.headers);
        if (token) await this.newSession(token);
        return res.status(200).json({ token: token });
      } catch (error) {
        Logger.error(`${error}`);
        return res.status(401).json({ msg: "User is already loged in" });
      }
    }

    try {
      const user = await User.findOne(
        { username: userInfo.username, password: userInfo.password },
        { id: 1, username: 1, email: 1, imgUrl: 1, type: 1 }
      );

      let msg;
      if (user) {
        const pending: IPending = await Pending.findOne({ user: user.id });

        if (pending && pending.pending === 1) {
          const token = Authenticator.generateAccessToken({
            email: user.email,
            imgUrl: user.imgUrl,
            type: user.type,
            username: user.username,
            id: user.id,
          });

          try {
            await this.newSession(token);
          } catch (error) {
            Logger.error(`${error}`);
            return res.status(401).json({ msg: "User is already loged in" });
          }

          return res.status(200).json({ token: token });
        }

        switch (pending.pending) {
          case 2:
            msg = "This user has been blocked";
            break;
          case 0:
          default:
            msg = "Your registration request is being reviewed";
            break;
        }
      } else {
        msg = "Invalid credentials";
      }
      return res.status(401).json({ msg: msg });
    } catch (error) {
      Logger.error(`${error}`);
      return res.sendStatus(500);
    }
  }

  async logout(req: express.Request, res: express.Response) {
    const userData: ICookieData = req.body.cookieData;
    if (!userData) return res.sendStatus(401);

    try {
      const result = await Session.deleteOne({ user: userData.id });
    } catch (error) {
      Logger.error(`${error}`);
      return res.sendStatus(500);
    }

    return res.status(200).json({ token: null });
  }

  async register(req: express.Request, res: express.Response) {
    const userData: IUser = req.body;

    let msg;
    const defaultPic = process.env.HOST! + "/u/default.svg";
    try {
      const user: IUser[] = await User.insertMany({
        name: userData.name,
        surname: userData.surname,
        username: userData.username,
        password: userData.password,
        city: userData.city,
        birthday: userData.birthday,
        phone: userData.phone,
        email: userData.email,
        type: userData.type,
        imgUrl: userData.imgUrl || defaultPic,
        agency: userData.agency,
        fovorits: userData.fovorits || [],
      });

      if (user) {
        return res.sendStatus(202);
      }
    } catch (error) {
      Logger.error(`${error}`);
      msg = "Username or email are already in use";
    }

    return res.status(400).json({ msg: msg });
  }

  async grantAccess(req: express.Request, res: express.Response) {
    const { id } = req.body;

    return await this.adminOperation(req, res, async () => {
      const result = await Pending.updateOne({ user: id }, { pending: 1 });
      return res.sendStatus(200);
    });
  }

  async blockAccess(req: express.Request, res: express.Response) {
    const { id } = req.body;

    return await this.adminOperation(req, res, async () => {
      const result = await Pending.updateOne({ user: id }, { pending: 2 });
      return res.sendStatus(200);
    });
  }

  async deleteUser(req: express.Request, res: express.Response) {
    const { id } = req.body;

    return await this.adminOperation(req, res, async () => {
      const result = await User.deleteOne({ _id: id });
      return res.sendStatus(200);
    });
  }

  async getAllUsers(req: express.Request, res: express.Response) {
    const { id } = req.body.cookieData;

    return await this.adminOperation(req, res, async () => {
      const result = await Pending.find({ user: { $nin: [id] } }).populate(
        "user"
      );
      return res.status(200).json(result);
    });
  }

  async getAllOnlineUsers(req: express.Request, res: express.Response) {
    return await this.adminOperation(req, res, async () => {
      const result = await Session.find({}).populate("user");

      const users = result.map((session) => {
        return session.user;
      });

      return res.status(200).json(users);
    });
  }

  async updateUserImg(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let err: Error | null = null;
    try {
      const username = req.body.username;
      const siteUrl = process.env.HOST;
      if (req.file && username && siteUrl) {
        const imgUrl = siteUrl + "/u/" + req.file?.filename;
        await User.updateOne({ username: username }, { imgUrl: imgUrl });
      }
    } catch (error) {
      Logger.error(`${error}`);
      err = <Error>error;
    }
    return next(err);
  }

  async changePassword(req: express.Request, res: express.Response) {
    const { cookieData, newPassword } = req.body;
    return await this.userOperation(req, res, async () => {
      const userData: ICookieData = cookieData;
      const result = await User.updateOne(
        { username: userData.username, email: userData.email, id: userData.id },
        { password: newPassword }
      );
      return res.sendStatus(200);
    });
  }

  private async userOperation(
    req: express.Request,
    res: express.Response,
    lambda: CallableFunction
  ) {
    try {
      return await lambda();
    } catch (error) {
      Logger.error(`${error}`);
    }

    return res.sendStatus(401);
  }

  /**
   * Function that is an abstraction for admin contorl
   * @param lambda callback function returung Promise
   * @returns
   */
  private async adminOperation(
    req: express.Request,
    res: express.Response,
    lambda: CallableFunction
  ) {
    const { cookieData } = req.body;

    if (cookieData) {
      const userData: ICookieData = cookieData;

      // check if admin is making a request
      if (userData.type === 0) {
        try {
          return await lambda();
        } catch (error) {
          Logger.error(`${error}`);
          return res.status(400).json({ error: `${error}` });
        }
      }
    }

    return res.sendStatus(401);
  }

  private async newSession(token: string) {
    const data = Authenticator.tokenData(token);

    if (!data.exp) throw new Error("Token does not contain field 'exp'");

    await Session.insertMany({
      sessionToken: token,
      user: data.id,
      expires: new Date(data.exp * 1000),
    });
  }

  /**
   * Check if user is loged onto the system
   * @param req
   * @param res
   * @param next
   * @returns
   */
  async userLogedIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const token = Authenticator.getToken(req.headers);
    if (!token) return next();

    const result = await Session.findOne({
      token: token,
    });
    if (!result) return next();
    return res.status(401).json({ msg: "User is already singed in" });
  }

  static async isOnline(req: express.Request): Promise<Boolean> {
    const token = Authenticator.getToken(req.headers);
    if (!token) return false;

    const result = await Session.findOne({
      token: token,
    });
    if (result) return true;
    return false;
  }
}
