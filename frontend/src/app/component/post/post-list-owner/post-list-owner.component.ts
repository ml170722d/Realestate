import { Component, Input, OnInit } from '@angular/core';
import { PostService } from 'src/app/service/post.service';
import Post from 'src/model/post.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-post-list-owner',
  templateUrl: './post-list-owner.component.html',
  styleUrls: ['./post-list-owner.component.scss'],
})
export class PostListOwnerComponent implements OnInit {
  constructor(private ps: PostService) {}

  ngOnInit(): void {
    this.ps.get().subscribe((d: Responce) => {
      this.list = d.body.filter((v: any) => v.advertiser._id === this.id);
    });
  }

  @Input() id: string;

  list: Post[] = [];
}
