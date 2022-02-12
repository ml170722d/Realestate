import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/util/url';

@Injectable({
  providedIn: 'root',
})
export class AgencyService {
  constructor(private http: HttpClient) {}
  private base_endpoint: string = SERVER_URL + '/agency';

  get(id?: string) {
    if (id) return this.http.get(`${this.base_endpoint}?id=${id}`);
    return this.http.get(`${this.base_endpoint}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.base_endpoint}/id/${id}`);
  }

  new(data: {
    address: string;
    city: string;
    name: string;
    phone: string;
    pib: string;
  }) {
    return this.http.post(`${this.base_endpoint}`, data);
  }

  update(data: {
    address: string;
    city: string;
    name: string;
    phone: string;
    pib: string;
    id: string;
  }) {
    return this.http.patch(`${this.base_endpoint}`, data);
  }
}
