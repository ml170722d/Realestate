import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import IUser from 'src/app/interface/user.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public u: any,
    private ref: MatDialogRef<InfoComponent>
  ) {
    this.user = u;
  }

  user: IUser = {};

  close() {
    this.ref.close();
  }

  ngOnInit(): void {}
}
