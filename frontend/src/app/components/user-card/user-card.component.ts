import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import IResponce from 'src/app/interface/responce.interface';
import IUser from 'src/app/interface/user.interface';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  @Input() user: IUser = {};

  @Output() event = new EventEmitter();

  deleteUser() {
    this.adminService
      .deleteUser({
        id: String(this.user._id),
        username: String(this.user.username),
      })
      .subscribe(() => {
        this.event.emit();
      });
  }

  grandAccess() {
    this.adminService
      .grantAcess({
        username: String(this.user.username),
        id: String(this.user._id),
      })
      .subscribe((data) => {
        this.event.emit();
      });
  }

  denyAccess() {
    this.adminService
      .denyAcess({
        username: String(this.user.username),
        id: String(this.user._id),
      })
      .subscribe((data) => {
        this.event.emit();
      });
  }
}
