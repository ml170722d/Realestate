import IModel from "./model.interface";

export default interface IUser extends IModel {
  username?: String;
  password?: String;
  name?: String;
  surname?: String;
  email?: String;
  phone?: String;
  city?: String;
  birthday?: Date;
  type?: Number;
  imgUrl?: String;
  agency?: String;
  licence?: String;
  access?: Boolean;
  favorite?: String[];
}
