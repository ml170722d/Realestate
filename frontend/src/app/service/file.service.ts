import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const form: FormData = new FormData();
    form.append('id', data.id);
    if (data.pic) form.append(target, data.pic);
    if (data.pics) {
      for (let i = 0; i < data.pics.length; i++) {
        form.append(target, data.pics[i]);
      }
    }

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.patch(`${this.base_endpoint}/${target}`, form, {
      headers: headers,
    });
  }
}
