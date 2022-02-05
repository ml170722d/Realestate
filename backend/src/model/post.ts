import Location from "./location";
import Model from "./model";
import User from "./user";

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

export default class Post extends Model {
  title?: string;
  location?: string | Location;
  microlocation?: string;
  area?: number;
  rooms?: number;
  constructionYear?: number;
  state?: string;
  heating?: string;
  floor?: number;
  totalFloors?: number;
  parking?: Parking;
  monthlyUtilities?: number;
  price?: number;
  about?: string;
  characteristics?: Characteristics[];
  type?: REType;
  advertiser?: string | User;
  pics?: string[];
  published?: Date;
  updated?: Date;
  sold?: boolean;
}

export class IPostFilter {
  type?: REType;
  location?: string;
  priceTo?: number;
  areaFrom?: number;
  minRooms?: number;
}
