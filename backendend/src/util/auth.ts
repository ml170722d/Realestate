import express from "express";
import Logger from "js-logger";
import jwt from "jsonwebtoken";
import ICookieData from "./cookie";

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
  generateAccessToken(data: ICookieData) {
    return jwt.sign(data, this.getSecret(), {
      expiresIn: "1h",
      algorithm: "HS512",
    });
  }

  /**
   * middleware that checks if token is valid and puts it on req.doby.cookieData so it can be proccessed further if need be
   * @param req from user
   * @param res from server
   * @param next function to be chained for precessing request
   */
  authenticateToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const authHeader = req.headers["authorization"];
    if (authHeader === undefined) return next();

    const token = authHeader.trim();
    if (token === null) return res.sendStatus(401);

    const secret = this.getSecret();
    try {
      const cookieData = jwt.verify(token, secret);

      req.body.cookieData = cookieData;
    } catch (error) {
      Logger.error(`${error}`);
    }

    next();
  }
}
