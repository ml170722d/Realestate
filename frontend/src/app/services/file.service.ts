import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Util from '../util/util';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  uploadUserProfileImg(data: { id: string; avatar: File }) {
    return this.http.patch(`${Util.uri}/avatar/upload`, data);
  }

  uploadFile(url: string, data: { id: string; avatar: File }) {
    return this.http.patch(url, data);
  }
}
