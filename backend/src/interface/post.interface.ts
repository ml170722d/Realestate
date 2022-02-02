import ILocation from "./location.interface";
import IModel from "./model.interface";
import IUser from "./user.interface";

export enum Characteristics {
  TERRACE = "Terrace",
  BASEMENT = "Basement",
  INTERNET = "Internet",
  GARAGE = "Garage",
  INTERCOM = "Intercom",
  GARDEN = "Garden",
  PHONE = "Phone",
  ELEVATOR = "Elevator",
  CLIMATE = "Climate",
  LOGGIA = "Loggia",
  FRANC_BALCONY = "Franc. balcony",
}

export enum Parking {
  YES = "Yes",
  NO = "No",
}

export enum REType {
  APARTMENT = "Apartment",
  HOUSE = "House",
  COTTAGE = "Cottage",
  SHOP = "Shop",
  WAREHOUSE = "Warehouse",
}

export default interface IPost extends IModel {
  title?: String | Number;
  location?: String | ILocation | Number;
  microlocation?: String | Number;
  area?: Number;
  rooms?: Number;
  constructionYear?: Number;
  state?: String | Number;
  heating?: String | Number;
  floor?: Number;
  totalFloors?: Number;
  parking?: Parking | Number;
  monthlyUtilities?: Number;
  price?: Number;
  about?: String | Number;
  characteristics?: Characteristics[] | Number;
  type?: REType | Number;
  advertiser?: String | IUser | Number;
  pics?: String[] | Number;
  published?: Date | Number;
  updated?: Date | Number;
  sold?: Boolean | Number;
}

export interface IPostFilter {
  type: REType;
  location?: String;
  priceTo?: Number;
  areaFrom?: Number;
  minRooms?: Number;
}
