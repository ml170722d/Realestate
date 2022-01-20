import IModel from "./model.interface";

export default interface IAgency extends IModel {
  pib?: Number;
  city?: String | Number;
  name?: String | Number;
  address?: String | Number;
  phone?: String | Number;
}
