import { Component, Input, OnInit } from '@angular/core';
import IResponce from 'src/app/interface/responce.interface';
import IUser from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.us.allUsers().subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  users: IUser[] = [];
  @Input() hide: boolean = false;

  toggle() {
    this.hide = !this.hide;
  }

  private onSuccess(data: IResponce) {
    this.users = data.body;
  }

  private onFail(error: any) {
    console.error(error);
  }
}
