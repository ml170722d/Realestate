export default class Model {
  _id?: string = undefined;

  get id() {
    return this._id;
  }

  set id(id: string | undefined) {
    this._id = id;
  }
}
