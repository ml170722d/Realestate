import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  constructor(private us: UserService, private r: Router) {}

  ngOnInit(): void {}

  msg: string = '';
  @Output() e = new EventEmitter();

  submit() {
    if (this.data.password != this.repeatPass) {
      this.msg = 'Passwords not maching';
      return;
    }

    if (
      !/(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[-+_!@#$%^&*.,?])[A-Za-z][A-Za-z\d-+_!@#$%^&*.,?]{7,}/.test(
        String(this.data.password)
      )
    ) {
      this.msg = 'Invalid password format';
      return;
    }
    this.msg = '';

    console.log(this.data);

    this.us
      .register({
        birthday: this.data.birthday!.toString(),
        city: this.data.city!,
        email: this.data.email!,
        name: this.data.name!,
        password: this.data.password!,
        phone: this.data.phone!,
        surname: this.data.surname!,
        type: this.data.type!.toString(),
        username: this.data.username!,
      })
      .subscribe(
        (res: Responce) => {
          this.e.emit(res.msg);
        },
        (err) => {
          console.debug(err);
          this.msg = err.error.msg;
        }
      );
  }

  data: User = new User();
  repeatPass: string = '';
}
