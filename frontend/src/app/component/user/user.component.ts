import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/model/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private r: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('u')!);
    if (this.user.type! < 0 || this.user.type! > 2) this.r.navigate(['']);
  }

  user: User = new User();
}
