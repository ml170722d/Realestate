import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  evet: any = null;

  catchEvent(e: any) {
    this.evet = e;
  }
}
