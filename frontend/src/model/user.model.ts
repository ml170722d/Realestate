import Model from './model.model';

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

  constructor(data?: any) {
    super(data);
    if (!data) return;
    this.username = data.username;
    this.password = data.password;
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.phone = data.phone;
    this.city = data.city;
    this.birthday = data.birthday;
    this.type = data.type;
    this.imgUrl = data.imgUrl;
    this.agency = data.agency;
    this.licence = data.licence;
    this.access = data.access;
    this.favorite = data.favorite;
  }
}
