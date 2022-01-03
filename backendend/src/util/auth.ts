import express from "express";
import Logger from "js-logger";
import jwt from "jsonwebtoken";
import ICookieData from "./cookie";
import User from "../models/user";

export default class Authenticator {
  private getSecret(): string {
    const secret = process.env.TOKEN_SECRET;
    if (!secret)
      throw new Error("Environment variable TOKEN_SECRET is not defind!!!");

    return Buffer.from(secret).toString("base64");
  }

  /**
   *
   * @param data that is used to create token
   * @returns singed token
   */
  generateAccessToken(data: ICookieData): string {
    return jwt.sign(data, this.getSecret(), {
      expiresIn: "1h",
      algorithm: "HS512",
    });
  }

  tokenData(token: string): ICookieData {
    return <ICookieData>jwt.verify(token, this.getSecret());
  }

  getToken(req: express.Request): string | null {
    const authHeader = req.headers["authorization"];
    if (authHeader === undefined) return null;

    const token = authHeader.trim();
    if (token === "null") return null;
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
    const token = this.getToken(req);
    if (token === null) return next();

    const secret = this.getSecret();
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
        return next();
      } else if (error instanceof jwt.NotBeforeError) {
      } else if (error instanceof jwt.JsonWebTokenError) {
      }

      return res.sendStatus(400);
    }

    return res.sendStatus(401);
  }
}
