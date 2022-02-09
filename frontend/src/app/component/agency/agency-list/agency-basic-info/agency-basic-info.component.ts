import { Component, Input, OnInit } from '@angular/core';
import Agency from 'src/model/agency.model';

@Component({
  selector: 'app-agency-basic-info',
  templateUrl: './agency-basic-info.component.html',
  styleUrls: ['./agency-basic-info.component.scss'],
})
export class AgencyBasicInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() agency: Agency = new Agency();

  hideContact = true;

  toggleContact() {
    this.hideContact = !this.hideContact;
  }
}
