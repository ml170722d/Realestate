import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LocationService } from 'src/app/service/location.service';
import { PostService } from 'src/app/service/post.service';
import Location from 'src/model/location.model';
import Post, { Characteristics, REType } from 'src/model/post.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-change-post-data',
  templateUrl: './change-post-data.component.html',
  styleUrls: ['./change-post-data.component.scss'],
})
export class ChangePostDataComponent implements OnInit {
  constructor(
    private ps: PostService,
    private r: Router,
    private ls: LocationService
  ) {}

  ngOnInit(): void {
    const tmp = this.r.url.split('/');
    const id = tmp[tmp.length - 1];

    this.ps.get(id).subscribe((d: Responce) => {
      this.post = d.body;
    });

    this.ls.get().subscribe((d: Responce) => {
      this.locs = d.body;
    });
  }

  post: Post;
  charLst: Characteristics[] = [];

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
  types: REType[] = [
    REType.APARTMENT,
    REType.COTTAGE,
    REType.HOUSE,
    REType.SHOP,
    REType.WAREHOUSE,
  ];
  locs: Location[] = [];

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

  avg: any;
  subject: Subject<void> = new Subject<void>();

  getAvgForLoc() {
    this.ps.avg(this.post.location!.toString()).subscribe((d: Responce) => {
      this.avg = d.body;
    });
  }

  private uploadPictures() {
    this.subject.next();
    this.post = new Post();
  }

  updatePost() {
    this.uploadPictures();
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
}
