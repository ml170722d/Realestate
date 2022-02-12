import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Logger from 'js-logger';
import { UserService } from 'src/app/service/user.service';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private us: UserService, private r: Router) {}

  ngOnInit(): void {}

  user: User = new User({});
  @Output() e = new EventEmitter<any>();

  login() {
    this.us
      .login({
        username: this.user.username!,
        password: this.user.password!,
      })
      .subscribe(
        (d) => this.onSuccess(d),
        (e) => this.onFail(e)
      );
  }

  private onSuccess(data: Responce) {
    if (!data.body) {
      this.e.emit('User not found');
      return;
    }

    this.e.emit('');
    sessionStorage.setItem('u', JSON.stringify(data.body));
    this.r.navigate(['user']);
  }

  private onFail(error: any) {
    Logger.debug(error);
    this.e.emit(error);
  }
}
