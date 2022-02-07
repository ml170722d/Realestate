import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Logger from 'js-logger';
import { userInfo } from 'os';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';
import User from 'src/model/user.model';

@Component({
  selector: 'app-user-basic-info',
  templateUrl: './user-basic-info.component.html',
  styleUrls: ['./user-basic-info.component.scss'],
})
export class UserBasicInfoComponent implements OnInit {
  constructor(private us: UserService, private as: AdminService) {}

  ngOnInit(): void {}

  @Input() user: User = new User({});
  @Output() e = new EventEmitter();

  getAccess(): string {
    return String(this.user.access);
  }

  remove() {
    this.us.delete(this.user.id!).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  deny() {
    this.as.deny({ id: this.user.id! }).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  grant() {
    this.as.grant({ id: this.user.id! }).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  private onSuccess(data: any) {
    this.e.emit();
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
