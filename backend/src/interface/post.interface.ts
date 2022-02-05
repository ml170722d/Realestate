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
  title?: String;
  location?: String | ILocation;
  microlocation?: String;
  area?: Number;
  rooms?: Number;
  constructionYear?: Number;
  state?: String;
  heating?: String;
  floor?: Number;
  totalFloors?: Number;
  parking?: Parking;
  monthlyUtilities?: Number;
  price?: Number;
  about?: String;
  characteristics?: Characteristics[];
  type?: REType;
  advertiser?: String | IUser;
  pics?: String[];
  published?: Date;
  updated?: Date;
  sold?: Boolean;
}

export interface IPostFilter {
  type: REType;
  location?: String;
  priceTo?: Number;
  areaFrom?: Number;
  minRooms?: Number;
}
