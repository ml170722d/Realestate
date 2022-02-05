import Model from "./model.model";

export default class User extends Model {
  username?: string;
  password?: string;
  name?: string;
  surname?: string;
  email?: string;
  phone?: string;
  city?: string;
  birthday?: Date;
  type?: number;
  imgUrl?: string;
  agency?: string;
  licence?: string;
  access?: boolean;
  favorite?: string[];
}
