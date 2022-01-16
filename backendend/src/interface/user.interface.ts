import IModel from "./model.interface";

export default interface IUser extends IModel {
  username?: String | Number;
  password?: String | Number;
  name?: String | Number;
  surname?: String | Number;
  email?: String | Number;
  phone?: String | Number;
  city?: String | Number;
  birthday?: Date | Number;
  type?: Number;
  imgUrl?: String | Number;
  agency?: String | Number;
  licence?: String | Number;
  access?: Boolean | Number;
  fovorits?: String[] | Number;
}
