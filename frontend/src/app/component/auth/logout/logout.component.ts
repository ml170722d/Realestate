import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Logger from 'js-logger';
import { UserService } from 'src/app/service/user.service';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private us: UserService, private r: Router) {}

  ngOnInit(): void {}

  @Input() id: string = '';

  logout() {
    this.us.logout({ id: this.id }).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  private onSuccess(data: Responce) {
    sessionStorage.clear();
    this.r.navigate(['']);
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
