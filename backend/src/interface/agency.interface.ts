import IModel from "./model.interface";

export default interface IAgency extends IModel {
  pib?: Number;
  city?: String;
  name?: String;
  address?: String;
  phone?: String;
}
