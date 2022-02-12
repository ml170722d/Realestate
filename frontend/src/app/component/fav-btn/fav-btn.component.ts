import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-fav-btn',
  templateUrl: './fav-btn.component.html',
  styleUrls: ['./fav-btn.component.scss'],
})
export class FavBtnComponent implements OnInit {
  constructor(private us: UserService) {}

  ngOnInit(): void {
    this.u = JSON.parse(sessionStorage.getItem('u')!);

    this.us.get(this.u._id).subscribe((d: Responce) => {
      this.u = d.body;

      for (let i = 0; i < this.u.favorite!.length; i++) {
        if (this.u.favorite![i] === this.postID) {
          this.mark();
          break;
        }
      }
    });
  }

  @Input() postID: string = '';
  u: User;
  redHeart = false;

  fav() {
    this.u.favorite?.push(this.postID);

    this.us
      .update({
        agency: this.u.agency!,
        birthday: new Date(this.u.birthday!).toString(),
        city: this.u.city!,
        email: this.u.email!,
        favorite: this.u.favorite!,
        id: this.u._id!,
        licence: this.u.licence!,
        name: this.u.name!,
        phone: this.u.phone!,
        surname: this.u.surname!,
        username: this.u.username!,
      })
      .subscribe((d) => {
        this.mark();
      });
  }

  mark() {
    this.redHeart = true;
  }
}
