import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import IUser from 'src/app/interface/user.interface';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  user: IUser = {};

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
  }

  detailsDialog: any = null;

  details() {
    if (this.detailsDialog) {
      this.detailsDialog.close();
      this.detailsDialog = null;
    }
    this.detailsDialog = this.dialog.open(InfoComponent, {
      data: this.user,
    });
  }
}
