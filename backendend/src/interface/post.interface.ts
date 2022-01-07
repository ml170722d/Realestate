export enum Characteristics {
  TERRACE = "terrace",
  BASEMENT = "basement",
  INTERNET = "Internet",
  GARAGE = "garage",
  INTERCOM = "intercom",
  GARDEN = "garden",
  PHONE = "phone",
  ELEVATOR = "elevator",
  CLIMATE = "climate",
  LOGGIA = "loggia",
  FRANC_BALCONY = "franc. balcony",
}

export enum Parking {
  Yes = "YES",
  No = "NO",
}

export enum REType {
  APARTMENT = "APARTMENT",
  HOUSE = "HOUSE",
  COTTAGE = "COTTAGE",
  SHOP = "SHOP",
  WAREHOUSE = "WAREHOUSE",
}

export default interface IPost {
  id?: String;
  title?: String;
  city?: String;
  municipality?: String;
  microlocation?: String;
  street?: String;
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
  advertiser?: String[];
}

export interface IpostFilter {
  type: REType;
  location?: String;
  priceTo?: Number;
  areaFrom?: Number;
  minRooms?: Number;
}
