import Location from './location.model';
import Model from './model.model';
import User from './user.model';

export enum Characteristics {
  TERRACE = 'Terrace',
  BASEMENT = 'Basement',
  INTERNET = 'Internet',
  GARAGE = 'Garage',
  INTERCOM = 'Intercom',
  GARDEN = 'Garden',
  PHONE = 'Phone',
  ELEVATOR = 'Elevator',
  CLIMATE = 'Climate',
  LOGGIA = 'Loggia',
  FRANC_BALCONY = 'Franc. balcony',
}

export enum Parking {
  YES = 'Yes',
  NO = 'No',
}

export enum REType {
  APARTMENT = 'Apartment',
  HOUSE = 'House',
  COTTAGE = 'Cottage',
  SHOP = 'Shop',
  WAREHOUSE = 'Warehouse',
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

  constructor(data?: any) {
    super(data);
    if (!data) return;
    this.title = data.title;
    this.location = data.location;
    this.microlocation = data.microlocation;
    this.area = data.area;
    this.rooms = data.rooms;
    this.constructionYear = data.constructionYear;
    this.state = data.state;
    this.heating = data.heating;
    this.floor = data.floor;
    this.totalFloors = data.totalFloors;
    this.parking = data.parking;
    this.monthlyUtilities = data.monthlyUtilities;
    this.price = data.price;
    this.about = data.about;
    this.characteristics = data.characteristics;
    this.type = data.type;
    this.advertiser = data.advertiser;
    this.pics = data.pics;
    this.published = data.published;
    this.updated = data.updated;
    this.sold = data.sold;
  }
}

export class PostFilter {
  type?: REType;
  location?: string;
  priceTo?: number;
  areaFrom?: number;
  minRooms?: number;
}
