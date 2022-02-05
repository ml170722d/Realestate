import { Component, OnInit } from '@angular/core';
import IResponce from 'src/app/interface/responce.interface';
import IUser from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  msg: string = '';

  

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

    this.userService.register(this.data).subscribe(
      (res: IResponce) => {
        alert(res.msg);
      },
      (err) => {
        console.debug(err);
        this.msg = err.error.msg;
      }
    );
  }

  data: IUser = {};
  repeatPass: string = '';
}
