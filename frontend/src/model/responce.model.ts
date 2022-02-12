export default class Responce {
  msg?: string;
  body?: any;

  constructor(data?: any) {
    if (!data) return;
    this.msg = data.msg;
    this.body = data.body;
  }
}
