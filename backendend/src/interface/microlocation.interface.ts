import IModel from "./model.interface";

export default interface IMicrolocation extends IModel {
  city?: String | Number;
  municipality?: String | Number;
  street?: String | Number;
  locations?: String[] | Number;
}
