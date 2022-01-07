import express from "express";
import { IncomingHttpHeaders } from "http";
import Logger from "js-logger";
import jwt from "jsonwebtoken";
import ICookieData from "../interface/cookie.interface";
import Session from "../models/session";
import User from "../models/user";

export default class Authenticator {
  private static getSecret(): string {
    const secret = process.env.SECRET;
    if (!secret)
      throw new Error("Environment variable TOKEN_SECRET is not defind!!!");

    return Buffer.from(secret).toString("base64");
  }

  /**
   *
   * @param data that is used to create token
   * @returns singed token
   */
  static generateAccessToken(data: ICookieData): string {
    return jwt.sign(data, Authenticator.getSecret(), {
      expiresIn: "1h",
      algorithm: "HS512",
    });
  }

  static tokenData(token: string): ICookieData {
    return <ICookieData>jwt.verify(token, Authenticator.getSecret());
  }

  static getToken(headers: IncomingHttpHeaders): string | null {
    const authHeader = headers.authorization;
    if (authHeader === undefined || authHeader === "null") return null;

    const token = authHeader.trim();
    return token;
  }

  /**
   * middleware that checks if token is valid and puts it on req.doby.cookieData so it can be proccessed further if need be
   */
  async authenticateToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const token = Authenticator.getToken(req.headers);
    if (token === null) return next();

    const secret = Authenticator.getSecret();
    try {
      const cookieData: any = jwt.verify(token, secret);

      const { username, type, email, id } = cookieData;
      const user = await User.findOne({
        username: username,
        type: type,
        email: email,
        id: id,
      });

      if (user) {
        req.body.cookieData = cookieData;

        return next();
      }
    } catch (error) {
      Logger.error(`${error}`);
      if (error instanceof jwt.TokenExpiredError) {
        await Session.deleteOne({ token: token });
        return next();
      } else if (error instanceof jwt.NotBeforeError) {
      } else if (error instanceof jwt.JsonWebTokenError) {
      }

      return res.sendStatus(400);
    }

    return res.sendStatus(401);
  }
}
