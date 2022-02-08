import { Component, Input, OnInit } from '@angular/core';
import Location from 'src/model/location.model';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() loc: Location = new Location();
}
