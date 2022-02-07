import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/util/url';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}
  private base_endpoint: string = SERVER_URL + '/post';

  get(id?: string) {
    if (id) return this.http.get(`${this.base_endpoint}?id=${id}`);
    return this.http.get(`${this.base_endpoint}`);
  }

  latest(n: number) {
    return this.http.get(`${this.base_endpoint}/latest?n=${n}`);
  }

  update(data: {
    id: string;
    about: string;
    advertiser: string;
    characteristics: string;
    area: string;
    constructionYear: string;
    floor: string;
    heating: string;
    location: string;
    microlocation: string;
    monthlyUtilities: string;
    parking: string;
    pics: string;
    price: string;
    rooms: string;
    state: string;
    title: string;
    totalFloors: string;
    type: string;
  }) {
    return this.http.patch(`${this.base_endpoint}/update`, data);
  }

  avg(locId: string) {
    return this.http.get(`${this.base_endpoint}/avg?locId=${locId}`);
  }

  sold(data: { id: string }) {
    return this.http.patch(`${this.base_endpoint}/sold`, data);
  }

  new(data: {
    about: string;
    advertiser: string;
    characteristics: string;
    area: string;
    constructionYear: string;
    floor: string;
    heating: string;
    location: string;
    microlocation: string;
    monthlyUtilities: string;
    parking: string;
    price: string;
    rooms: string;
    state: string;
    title: string;
    totalFloors: string;
    type: string;
  }) {
    return this.http.post(`${this.base_endpoint}`, data);
  }

  search(data: {
    type: string;
    areaFrom: string;
    minRooms: string;
    priceTo: string;
    location: string;
  }) {
    const query = this.base_endpoint + '/search';

    if (
      data.areaFrom ||
      data.location ||
      data.minRooms ||
      data.priceTo ||
      data.type
    ) {
      query.concat('?');

      if (data.areaFrom) query.concat(`areaFrom=${data.areaFrom}&`);
      if (data.location) query.concat(`location=${data.location}&`);
      if (data.minRooms) query.concat(`minRooms=${data.minRooms}&`);
      if (data.priceTo) query.concat(`priceTo=${data.priceTo}&`);
      if (data.type) query.concat(`type=${data.type}&`);
    }

    return this.http.get(query);
  }
}
