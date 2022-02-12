export default class Model {
  _id?: string;

  constructor(data?: any) {
    if (!data) return;
    this._id = data._id || data.id;
  }
}
