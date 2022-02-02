import { Component, Input, OnInit } from '@angular/core';
import IUser from 'src/app/interface/user.interface';

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.scss'],
})
export class UserWelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() user: IUser = {};
}
