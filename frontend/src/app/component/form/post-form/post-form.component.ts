import { Component, OnInit } from '@angular/core';
import { useDefaults } from 'js-logger';
import { Subject } from 'rxjs';
import { LocationService } from 'src/app/service/location.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';
import Location from 'src/model/location.model';
import Post, { Characteristics, REType } from 'src/model/post.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  constructor(
    private ps: PostService,
    private us: UserService,
    private ls: LocationService
  ) {}

  ngOnInit(): void {
    const id = JSON.parse(sessionStorage.getItem('u')!)._id;
    this.post.advertiser = id;

    this.ls.get().subscribe((d: Responce) => {
      this.locs = d.body;
    });
  }

  post: Post = new Post();
  subject: Subject<void> = new Subject<void>();
  locs: Location[] = [];
  chars: Characteristics[] = [
    Characteristics.BASEMENT,
    Characteristics.CLIMATE,
    Characteristics.ELEVATOR,
    Characteristics.FRANC_BALCONY,
    Characteristics.GARAGE,
    Characteristics.GARDEN,
    Characteristics.INTERCOM,
    Characteristics.INTERNET,
    Characteristics.LOGGIA,
    Characteristics.PHONE,
    Characteristics.TERRACE,
  ];
  charLst: Characteristics[] = [];
  types: REType[] = [
    REType.APARTMENT,
    REType.COTTAGE,
    REType.HOUSE,
    REType.SHOP,
    REType.WAREHOUSE,
  ];

  createPost() {
    this.post.characteristics = this.charLst;
    // console.log(this.post);
    // console.log(this.charLst);
    this.ps
      .new({
        about: this.post.about!,
        advertiser: this.post.advertiser!.toString(),
        area: this.post.area!.toString(),
        characteristics: this.post.characteristics!,
        constructionYear: this.post.constructionYear!.toString(),
        floor: this.post.floor!.toString(),
        heating: this.post.heating!,
        location: this.post.location!.toString(),
        microlocation: this.post.microlocation!,
        monthlyUtilities: this.post.monthlyUtilities!.toString(),
        parking: Boolean(this.post.parking!),
        price: this.post.price!.toString(),
        rooms: this.post.rooms!.toString(),
        state: this.post.state!,
        title: this.post.title!,
        totalFloors: this.post.totalFloors!.toString(),
        type: this.post.type!,
      })
      .subscribe(
        (d: Responce) => {
          console.log(d.body);
          this.post = d.body[0];
        },
        (e) => {
          alert('You must fill all fields');
        }
      );
  }

  avg: any;

  getAvgForLoc() {
    this.ps.avg(this.post.location!.toString()).subscribe((d: Responce) => {
      this.avg = d.body;
    });
  }

  uploadPictures() {
    this.subject.next();
    this.post = new Post();
  }

  private removeChar(char: Characteristics) {
    this.charLst = this.charLst.filter((v) => v != char);
  }

  private addChar(char: Characteristics) {
    this.charLst.push(char);
  }

  onCheckboxChange(ev: any, char: Characteristics) {
    if (ev.target.checked) return this.addChar(char);
    return this.removeChar(char);
  }
}
