import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Util from '../util/util';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  grantAcess(data: { username: string; id: string }) {
    return this.http.patch(`${Util.uri}/user/grant`, data);
  }

  denyAcess(data: { username: string; id: string }) {
    return this.http.patch(`${Util.uri}/user/deny`, data);
  }

  deleteUser(data: { username: string; id: string }) {
    return this.http.delete(`${Util.uri}/user`, { body: data });
  }

  newUser(data: { username: string; id: string }) {
    return this.http.post(`${Util.uri}/user`, data);
  }
}
