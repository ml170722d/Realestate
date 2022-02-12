import { Component, Input, OnInit } from '@angular/core';
import Logger from 'js-logger';
import { LocationService } from 'src/app/service/location.service';
import Location from 'src/model/location.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent implements OnInit {
  constructor(private ls: LocationService) {}

  ngOnInit(): void {
    this.updateList();
  }

  @Input() hide = true;
  locs: Location[] = [];

  toggle() {
    this.hide = !this.hide;
  }

  updateList() {
    this.ls.get().subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  private onSuccess(data: Responce) {
    this.locs = data.body;
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
