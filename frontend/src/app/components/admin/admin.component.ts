import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IResponce from 'src/app/interface/responce.interface';
import IUser from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.updateUsers();
  }

  user: IUser = {};

  users: IUser[] = [];

  updateUsers() {
    this.userService.allUsers().subscribe((data: IResponce) => {
      this.users = data.body;
    });
  }

  sendData() {
    return {
      username: String(this.user.username),
      id: String(this.user._id),
    };
  }
}
