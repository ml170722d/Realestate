import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.scss'],
})
export class AdvertiserComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.id = JSON.parse(sessionStorage.getItem('u')!)._id;
  }

  id: string;
}
