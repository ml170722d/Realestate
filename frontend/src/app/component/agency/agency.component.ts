import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Logger from 'js-logger';
import { AgencyService } from 'src/app/service/agency.service';
import Agency from 'src/model/agency.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
})
export class AgencyComponent implements OnInit {
  constructor(private as: AgencyService) {}

  ngOnInit(): void {}

  @Input() agency: Agency = new Agency();
  @Output() e = new EventEmitter();

  remove() {
    this.as.delete(this.agency._id!).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  private onSuccess(data: Responce) {
    this.e.emit();
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
