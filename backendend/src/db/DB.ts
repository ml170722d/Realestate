import Logger from "js-logger";
import mongoose from "mongoose";

export default class DB {
  private static instance: DB | null = null;
  private url = process.env.DATABASE_URL;

  private constructor() {
    Logger.debug(`DATABASE_URL=${process.env.DATABASE_URL}`);
    if (!this.url)
      throw new Error("Environment variable DATABASE_URL is not defind!!!");
  }

  /**
   * @throws error if something went wrong
   * @returns DB object
   */
  static async getInstance() {
    if (!this.instance) {
      this.instance = new DB();
      await this.instance.conncet();
    }

    return this.instance;
  }

  private async conncet() {
    const result = await mongoose.connect(this.url!, {
      autoIndex: true,
      keepAlive: true,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, // Use IPv4, skip trying IPv6
    });

    const conn = mongoose.connection;
    conn.syncIndexes();

    Logger.info(`Connection with databse is established`);
  }
}
