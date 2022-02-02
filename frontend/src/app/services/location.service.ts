import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ILocation from '../interface/location.interface';
import Util from '../util/util';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  new(data: ILocation) {
    return this.http.post(`${Util.uri}/ml`, data);
  }

  delete(id: string) {
    return this.http.delete(`${Util.uri}/ml`, {
      body: {
        id: id,
      },
    });
  }

  getAll() {
    return this.http.get(`${Util.uri}/ml`);
  }

  getOne(id: string) {
    return this.http.get(`${Util.uri}/ml?id=${id}`);
  }
}
