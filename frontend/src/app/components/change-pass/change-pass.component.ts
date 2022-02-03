import { Component, Input, OnInit } from '@angular/core';
import IResponce from 'src/app/interface/responce.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss'],
})
export class ChangePassComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit(): void {}

  @Input() data: { username?: string; id?: string } = {};
  pass: string = '';
  repPass: string = '';
  msg: string = '';

  change() {
    if (this.pass != this.repPass) {
      this.msg = 'Passwords not maching';
      return;
    }

    if (
      !/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-+_!@#$%^&*.,?])[A-Za-z][A-Za-z\d-+_!@#$%^&*.,?]{7,}/.test(
        String(this.pass)
      )
    ) {
      this.msg = 'Invalid password format';
      return;
    }
    this.msg = '';

    this.us
      .changePass({
        id: this.data.id!,
        username: this.data.username!,
        password: this.pass,
        newpass: this.repPass,
      })
      .subscribe(
        (data: IResponce) => {
          alert(data);
        },
        (err) => {
          console.debug(err);
          this.msg = err;
        }
      );
  }
}
