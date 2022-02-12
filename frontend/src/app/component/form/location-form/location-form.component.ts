import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Logger from 'js-logger';
import { LocationService } from 'src/app/service/location.service';
import Location from 'src/model/location.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss'],
})
export class LocationFormComponent implements OnInit {
  constructor(private ls: LocationService) {}

  ngOnInit(): void {}

  loc: Location = new Location();
  @Output() e = new EventEmitter();

  submit() {
    this.ls
      .new('new', {
        city: this.loc.city!,
        microlocations: [],
        municipality: this.loc.municipality!,
        street: this.loc.street!,
      })
      .subscribe(
        (d) => this.onSuccess(d),
        (e) => this.onFail(e)
      );
  }

  private onSuccess(data: Responce) {
    alert('Success');
    this.e.emit(data.body);
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
