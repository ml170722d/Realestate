import express from "express";
import Logger from "js-logger";
import User from "../models/user";
import Pending from "../models/pending";
import Authenticator from "../util/auth";
import ICookieData from "../util/cookie";
import Session from "../models/session";

export default class UserController {
  async login(req: express.Request, res: express.Response) {
    const { username, password, cookieData } = req.body;

    if (cookieData) {
      try {
        const token = new Authenticator().getToken(req);
        if (token) await this.newSession(token);
        return res.status(200).json({ token: token });
      } catch (error) {
        Logger.error(`${error}`);
        return res.status(401).json({ msg: "User is already loged in" });
      }
    }

    try {
      const user = await User.findOne(
        { username: username, password: password },
        { id: 1, username: 1, email: 1, imgUrl: 1, type: 1 }
      );

      let msg;
      if (user) {
        const pending = await Pending.findOne({ user: user.id });

        if (pending && pending.pending === 1) {
          const token = new Authenticator().generateAccessToken({
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
      }
      return res.status(200).json({ msg: msg || "No user with such username" });
    } catch (error) {
      Logger.error(`${error}`);
      return res.sendStatus(500);
    }
  }

  async logout(req: express.Request, res: express.Response) {
    const { cookieData } = req.body;
    if (!cookieData) return res.sendStatus(401);

    const userData: ICookieData = cookieData;
    try {
      const result = await Session.deleteOne({ user: userData.id });
    } catch (error) {
      Logger.error(`${error}`);
      return res.sendStatus(500);
    }

    return res.status(200).json({ token: null });
  }

  async register(req: express.Request, res: express.Response) {
    const {
      name,
      surname,
      username,
      password,
      city,
      birthday,
      phone,
      email,
      type,
      imgUrl,
      agency,
    } = req.body;

    let msg;
    try {
      const user = await User.insertMany({
        name: name,
        surname: surname,
        username: username,
        password: password,
        city: city,
        birthday: birthday,
        phone: phone,
        email: email,
        type: type,
        imgUrl: imgUrl,
        agency: agency,
      });

      if (user) {
        const id = user[0].id;

        const pending = await Pending.insertMany({
          user: id,
          pending: 0,
        });

        if (pending) {
          return res.sendStatus(202);
        }
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
    const data = new Authenticator().verifyToken(token);

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
    const token = new Authenticator().getToken(req);
    if (!token) return next();

    const result = await Session.findOne({
      token: token,
    });
    if (!result) return next();
    return res.status(401).json({ msg: "User is already singed in" });
  }
}
