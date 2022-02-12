import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Logger from 'js-logger';
import { AgencyService } from 'src/app/service/agency.service';
import Agency from 'src/model/agency.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.scss'],
})
export class AgencyFormComponent implements OnInit {
  constructor(private as: AgencyService) {}

  ngOnInit(): void {}

  agency: Agency = new Agency();

  @Output() e = new EventEmitter();

  submit() {
    this.as
      .new({
        address: this.agency.address!,
        city: this.agency.city!,
        name: this.agency.name!,
        phone: this.agency.phone!,
        pib: this.agency.pib!.toString(),
      })
      .subscribe(
        (d) => this.onSuccess(d),
        (e) => this.onFail(e)
      );
  }

  private onSuccess(data: Responce) {
    this.e.emit(data);
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
