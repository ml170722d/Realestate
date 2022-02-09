import { Component, Input, OnInit } from '@angular/core';
import Logger from 'js-logger';
import { AgencyService } from 'src/app/service/agency.service';
import Agency from 'src/model/agency.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.scss'],
})
export class AgencyListComponent implements OnInit {
  constructor(private as: AgencyService) {}

  ngOnInit(): void {
    this.updateList();
  }

  agencies: Agency[] = [];

  updateList() {
    this.as.get().subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  private onSuccess(data: Responce) {
    this.agencies = data.body;
  }

  private onFail(error: any) {
    Logger.debug(error);
  }

  @Input() hide = true;

  toggle() {
    this.hide = !this.hide;
  }
}
