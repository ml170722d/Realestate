import { Component, Input, OnInit } from '@angular/core';
import Logger from 'js-logger';
import { UserService } from 'src/app/service/user.service';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.updateList();
  }

  users: User[] = [];
  @Input() hide: boolean = true;

  toggle() {
    this.hide = !this.hide;
  }

  updateList() {
    this.us.get().subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  private onSuccess(data: Responce) {
    this.users = data.body;
  }

  private onFail(error: any) {
    Logger.debug(error);
  }
}
