import express from "express";
import Logger from "js-logger";
import User from "../models/user";
import Pending from "../models/pending";
import Authenticator from "../util/auth";
import ICookieData from "../util/cookie";

export default class UserController {
  /**
   * check if login credentials are valid and if user can permision to enter site
   * @param req from user
   * @param res from server
   */
  async login(req: express.Request, res: express.Response) {
    const { username, password, cookieData } = req.body;

    if (cookieData) {
      const token = new Authenticator().generateAccessToken({
        email: cookieData.email,
        imgUrl: cookieData.imgUrl,
        type: cookieData.type,
        username: cookieData.username,
        id: cookieData.id,
      });
      return res.status(200).json({ token: token });
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
      return res.sendStatus(501);
    }
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
    const { username, id } = req.body.cookieData;

    return await this.adminOperation(req, res, async () => {
      const result = await Pending.find({ user: { $nin: [id] } }).populate(
        "user"
      );
      console.log(result);
      return res.status(200).json(result);
    });
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
}
