import { Component, Input, OnInit } from '@angular/core';
import Location from 'src/model/location.model';

@Component({
  selector: 'app-location-basic-info',
  templateUrl: './location-basic-info.component.html',
  styleUrls: ['./location-basic-info.component.scss'],
})
export class LocationBasicInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() loc: Location = new Location();
}
