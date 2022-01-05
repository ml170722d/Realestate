import jwt from "jsonwebtoken";

export default interface ICookieData extends jwt.JwtPayload {
  username: String;
  type: Number;
  imgUrl: String;
  email: String;
  id: String;
}
