import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/util/url';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  private base_endpoint: string = SERVER_URL + '/user';

  private access(access: 'grant' | 'deny', data: { id: string }) {
    return this.http.patch(`${this.base_endpoint}/${access}`, data);
  }

  grant(data: { id: string }) {
    return this.access('grant', data);
  }

  deny(data: { id: string }) {
    return this.access('deny', data);
  }
}
