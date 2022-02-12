import Model from './model.model';

export default class Agency extends Model {
  pib?: number;
  city?: string;
  name?: string;
  address?: string;
  phone?: string;

  constructor(data?: any) {
    super(data);
    if (!data) return;
    this.pib = data.pib;
    this.address = data.address;
    this.city = data.city;
    this.name = data.name;
    this.phone = data.phone;
  }
}
