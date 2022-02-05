import { Component, Input, OnInit } from '@angular/core';
import IUser from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss'],
})
export class ChangeComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit(): void {}

  @Input() user: IUser = {};

  change() {
    
  }
}
