import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/util/url';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  private base_endpoint: string = SERVER_URL + '/file';

  upload(
    target: 'user' | 'post',
    data: {
      id: string;
      pic?: File;
      pics?: File[];
    }
  ) {
    return this.http.patch(`${this.base_endpoint}/${target}`, data);
  }
}
