import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AgencyService } from 'src/app/service/agency.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import Agency from 'src/model/agency.model';
import Post from 'src/model/post.model';
import Responce from 'src/model/responce.model';
import User from 'src/model/user.model';

@Component({
  selector: 'app-change-data',
  templateUrl: './change-data.component.html',
  styleUrls: ['./change-data.component.scss'],
})
export class ChangeDataComponent implements OnInit {
  constructor(
    private us: UserService,
    private as: AgencyService,
    private ps: PostService,
    private r: Router
  ) {}

  ngOnInit(): void {
    const tmp = this.r.url.split('/');
    const id = tmp[tmp.length - 1];

    this.us.get(id).subscribe((d: Responce) => {
      this.user = d.body;
      this.convertedDate = this.user.birthday!.toString().split('T')[0];
      this.updateFavList(this.user.favorite!);
    });

    this.as.get().subscribe((d: Responce) => {
      this.agencies = d.body;
    });
  }

  user: User = new User();
  agencies: Agency[] = [];
  favList: Post[] = [];
  convertedDate: string = '';

  submit() {
    this.emitSubject();
    this.us
      .update({
        id: this.user._id!,
        agency: this.user.agency!,
        birthday: new Date(this.convertedDate).toString(),
        city: this.user.city!,
        email: this.user.email!,
        favorite: this.user.favorite!,
        licence: this.user.licence!,
        name: this.user.name!,
        phone: this.user.phone!,
        surname: this.user.surname!,
        username: this.user.username!,
      })
      .subscribe((d: Responce) => {
        this.user = d.body;
      });
  }

  removeFav(id: string) {
    this.user.favorite = this.user.favorite!.filter((v) => {
      if (v != id) return true;
      return false;
    });

    this.updateFavList(this.user.favorite!);
  }

  private updateFavList(fav: string[]) {
    this.favList = [];
    for (let i = 0; i < fav.length; i++) {
      this.ps.get(fav[i]).subscribe((d: Responce) => {
        this.favList.push(d.body);
      });
    }
  }

  evSubject: Subject<void> = new Subject<void>();

  emitSubject() {
    this.evSubject.next();
  }
}
