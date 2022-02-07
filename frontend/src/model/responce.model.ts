export default class Responce {
  msg?: string;
  body?: any;

  constructor(data: any) {
    this.msg = data.msg;
    this.body = data.body;
  }
}
