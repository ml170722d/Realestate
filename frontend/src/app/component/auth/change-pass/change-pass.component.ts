import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Logger from 'js-logger';
import { UserService } from 'src/app/service/user.service';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit(): void {}

  @Input() id: string;
  newPass: string = '';
  repPass: string = '';
  msg: string = '';
  @Output() e = new EventEmitter();

  submit() {
    if (this.newPass != this.repPass) {
      this.msg = 'Passwords not maching';
      return;
    }

    if (
      !/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-+_!@#$%^&*.,?])[A-Za-z][A-Za-z\d-+_!@#$%^&*.,?]{7,}/.test(
        String(this.newPass)
      )
    ) {
      this.msg = 'Invalid password format';
      return;
    }

    this.msg = '';

    this.us.changePass({ id: this.id, password: this.newPass }).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  private onSuccess(data: Responce) {
    alert('Success');
    this.e.emit();
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
