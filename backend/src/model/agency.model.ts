import Model from "./model.model";

export default class Agency extends Model {
  pib?: number;
  city?: string;
  name?: string;
  address?: string;
  phone?: string;
}
