import Model from "./model.model";

export default class Location extends Model {
  city?: string;
  municipality?: string;
  street?: string;
  microlocations?: string[];
}
