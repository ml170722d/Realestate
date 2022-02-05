import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import IPost from 'src/app/interface/post.interface';
import IResponce from 'src/app/interface/responce.interface';
import IUser from 'src/app/interface/user.interface';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userServie: UserService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.postService.getLatest(5).subscribe(
      (data: IResponce) => {
        this.latest = data.body as IPost[];
      },
      (e) => {},
      () => {}
    );
  }

  user: IUser = {};
  msg: string = '';
  latest: IPost[] = [];

  login() {
    this.userServie.login(this.user as any).subscribe(
      (u: IResponce) => {
        if (u) {
          sessionStorage.setItem('user', JSON.stringify(u.body));
          this.router.navigate(['user']);
        }
      },
      (err) => {
        this.msg = err.error.msg;
      }
    );
  }
}
