import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Logger from 'js-logger';
import { PostService } from 'src/app/service/post.service';
import Post from 'src/model/post.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(private ps: PostService, private r: Router) {}

  ngOnInit(): void {
    const tmp = this.r.url.split('/');
    this.id = tmp[tmp.length - 1];

    this.ps.get(this.id).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  id: string = '';
  post: Post = new Post();

  private onSuccess(data: Responce) {
    this.post = data.body;
  }

  private onFail(error: any) {
    Logger.debug(error);
  }

  showLocation = false;
  showAdvertiser = false;

  toggleLoc() {
    this.showLocation = !this.showLocation;
  }

  toggleAdv() {
    this.showAdvertiser = !this.showAdvertiser;
  }
}
