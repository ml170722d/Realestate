export default class Model {
  private _id?: string;

  get id() {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }

  constructor(data: any) {
    this._id = data._id || data.id;
  }
}
