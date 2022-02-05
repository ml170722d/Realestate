import { Component, Input, OnInit } from '@angular/core';
import IUser from 'src/app/interface/user.interface';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input() user: IUser = {};
}
