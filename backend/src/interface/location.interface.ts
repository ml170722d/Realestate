import IModel from "./model.interface";

export default interface ILocation extends IModel {
  city?: String;
  municipality?: String;
  street?: String;
  microlocations?: String[];
}
