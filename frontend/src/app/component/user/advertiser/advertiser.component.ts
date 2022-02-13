import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-advertiser',
  templateUrl: './advertiser.component.html',
  styleUrls: ['./advertiser.component.scss'],
})
export class AdvertiserComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit(): void {
    if (!this.advertiser) {
      this.us.get(this.id).subscribe((d: Responce) => {
        this.advertiser = d.body;
      });
    }
  }

  @Input() id: any;
  @Input() advertiser: any | null = null;

  hide = true;

  toggle() {
    this.hide = !this.hide;
  }
}
