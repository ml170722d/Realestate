import { Component, OnInit } from '@angular/core';
import IAgency from 'src/app/interface/agency.interface';
import IResponce from 'src/app/interface/responce.interface';
import { AgencyService } from 'src/app/services/agency.service';

@Component({
  selector: 'app-new-agency-form',
  templateUrl: './new-agency-form.component.html',
  styleUrls: ['./new-agency-form.component.scss'],
})
export class NewAgencyFormComponent implements OnInit {
  constructor(private as: AgencyService) {}

  ngOnInit(): void {}

  agency: IAgency = {};

  msg: string = '';

  newAgency() {
    this.as.new(this.agency).subscribe(
      (data: IResponce) => {
        alert('Success');
      },
      (err) => {
        console.debug(err);
        this.msg = err.msg;
      }
    );
  }
}
