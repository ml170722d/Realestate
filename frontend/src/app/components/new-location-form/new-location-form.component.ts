import { Component, OnInit } from '@angular/core';
import ILocation from 'src/app/interface/location.interface';
import IResponce from 'src/app/interface/responce.interface';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-new-location-form',
  templateUrl: './new-location-form.component.html',
  styleUrls: ['./new-location-form.component.scss'],
})
export class NewLocationFormComponent implements OnInit {
  constructor(private ls: LocationService) {}

  ngOnInit(): void {}

  loc: ILocation = {};

  msg: string = '';

  addLoc() {
    this.ls.new(this.loc).subscribe(
      (data: IResponce) => {
        alert('Success');
      },
      (err) => {
        console.debug(err);
        this.msg = 'Error';
      }
    );
  }
}
