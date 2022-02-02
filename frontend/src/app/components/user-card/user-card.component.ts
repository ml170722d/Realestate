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
    const id = String(this.user._id);
    if (this.isSelfdestruct(id)) return;

    this.adminService
      .deleteUser({
        id: id,
        username: String(this.user.username),
      })
      .subscribe(() => {
        this.event.emit();
      });
  }

  grandAccess() {
    const id = String(this.user._id);
    if (this.isSelfdestruct(id)) return;

    this.adminService
      .grantAcess({
        username: String(this.user.username),
        id: id,
      })
      .subscribe((data) => {
        this.event.emit();
      });
  }

  denyAccess() {
    const id = String(this.user._id);
    if (this.isSelfdestruct(id)) return;

    this.adminService
      .denyAcess({
        username: String(this.user.username),
        id: id,
      })
      .subscribe((data) => {
        this.event.emit();
      });
  }

  private isSelfdestruct(id: string) {
    const { _id } = JSON.parse(sessionStorage.getItem('user')!);
    if (_id === id) {
      alert('You are not allowed to do this');
      return true;
    }
    return false;
  }
}
