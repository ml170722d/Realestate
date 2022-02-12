import { Component, Input, OnInit } from '@angular/core';
import Logger from 'js-logger';
import { PostService } from 'src/app/service/post.service';
import Post from 'src/model/post.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor(private ps: PostService) {}

  ngOnInit(): void {
    this.updateList(this.n);
  }

  @Input() n: number = 5;
  posts: Post[] = [];
  @Input() hide: boolean = true;

  private onSuccess(data: Responce) {
    this.posts = data.body;
  }

  private onFail(error: any) {
    Logger.debug(error);
  }

  updateList(n: number) {
    this.ps.latest(n).subscribe(
      (d) => this.onSuccess(d),
      (e) => this.onFail(e)
    );
  }

  toggle() {
    this.hide = !this.hide;
  }
}
