export default class Model {
  id?: string;

  constructor(data?: any) {
    if (!data) return;
    this.id = data._id || data.id;
  }
}
