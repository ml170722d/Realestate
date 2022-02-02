import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Util from '../util/util';
import IUser from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }) {
    return this.http.post(`${Util.uri}/auth/login`, data);
  }

  register(data: IUser) {
    return this.http.post(`${Util.uri}/auth/register`, data);
  }

  logout() {
    return this.http.delete(`${Util.uri}/auth/logout`);
  }

  allUsers() {
    return this.http.get(`${Util.uri}/users`);
  }

  getUser(id: string) {
    return this.http.get(`${Util.uri}/user/${id}`);
  }

  changePass(data: {
    username: string;
    id: string;
    password: string;
    newpass: string;
  }) {
    return this.http.post(`${Util.uri}/change/password`, data);
  }
}
