import Model from './model.model';

export default class Location extends Model {
  city?: string;
  municipality?: string;
  street?: string;
  microlocations?: string[];

  constructor(data: any) {
    super(data);
    this.city = data.city;
    this.street = data.street;
    this.municipality = data.municipality;
    this.microlocations = data.microlocations;
  }
}
