import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/util/url';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private base_endpoint: string = SERVER_URL + '/user';

  login(data: { username: string; password: string }) {
    return this.http.post(`${this.base_endpoint}/login`, data);
  }

  logout(data: { id: string }) {
    return this.http.delete(`${this.base_endpoint}/logout`, {
      body: data,
    });
  }

  delete(id: string) {
    return this.http.delete(`${this.base_endpoint}/id/${id}`);
  }

  register(data: {
    name: string;
    surname: string;
    username: string;
    password: string;
    city: string;
    birthday: string;
    phone: string;
    email: string;
    type: string;
  }) {
    return this.http.post(`${this.base_endpoint}/register`, data);
  }

  get(id?: string) {
    if (id) return this.http.get(`${this.base_endpoint}?id=${id}`);
    return this.http.get(`${this.base_endpoint}`);
  }

  update(data: {
    username: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    city: string;
    birthday: string;
    agency: string;
    licence: string;
    favorite: string;
  }) {
    return this.http.patch(`${this.base_endpoint}/update`, data);
  }

  changePass(data: { id: string; password: string }) {
    return this.http.patch(`${this.base_endpoint}/change`, data);
  }
}
