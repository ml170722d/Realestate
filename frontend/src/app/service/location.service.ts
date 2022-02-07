import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/util/url';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}
  private base_endpoint: string = SERVER_URL + '/loc';

  get(id?: string) {
    if (id) return this.http.get(`${this.base_endpoint}?id=${id}`);
    return this.http.get(`${this.base_endpoint}`);
  }

  delete(id: string) {
    return this.http.delete(`${this.base_endpoint}/id/${id}`);
  }

  new(
    op: 'new' | 'update',
    data: {
      city: string;
      municipality: string;
      street: string;
      microlocations: string;
    }
  ) {
    return this.http.post(`${this.base_endpoint}/${op}`, data);
  }
}
