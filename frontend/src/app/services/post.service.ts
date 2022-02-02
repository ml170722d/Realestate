import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IPost from '../interface/post.interface';
import Util from '../util/util';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getLatest(n: number) {
    return this.http.get(`${Util.uri}/post/latest?n=${n}`);
  }

  getAvrageAt(locationId: string) {
    return this.http.get(`${Util.uri}/ml/avg?id=${locationId}`);
  }

  update(data: IPost) {
    return this.http.patch(`${Util.uri}/post`, data);
  }

  getOne(id: string) {
    return this.http.get(`${Util.uri}/post/id/${id}`);
  }

  getAll() {
    return this.http.get(`${Util.uri}/post`);
  }

  new(data: IPost) {
    return this.http.post(`${Util.uri}/post`, data);
  }
}
