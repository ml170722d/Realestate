import { Component, Input, OnInit } from '@angular/core';
import Location from 'src/model/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loc2 = new Location(this.loc);
  }

  @Input() loc: Location | string = new Location();
  loc2: Location;
}
