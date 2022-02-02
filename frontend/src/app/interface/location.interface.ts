import IModel from "./model.interface";

export default interface ILocation extends IModel {
  city?: String | Number;
  municipality?: String | Number;
  street?: String | Number;
  microlocations?: String[] | Number;
}
