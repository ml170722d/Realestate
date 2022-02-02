import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IAgency from '../interface/agency.interface';
import Util from '../util/util';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private http: HttpClient) {}

  new(data: IAgency) {
    return this.http.post(`${Util.uri}/agency`, data);
  }

  delete(id: string) {
    return this.http.delete(`${Util.uri}/agency`, {
      body: {
        id: id,
      },
    });
  }

  getAll() {
    return this.http.get(`${Util.uri}/agency`);
  }
}
