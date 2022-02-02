export default class Host {
  static getHostUrl(): string {
    if (process.env.HOST || process.env.PORT) {
      return `http://${process.env.HOST}:${process.env.PORT}`;
    }
    throw Error("Environment variable HOST and/or POST is not defind!!!");
  }
}
