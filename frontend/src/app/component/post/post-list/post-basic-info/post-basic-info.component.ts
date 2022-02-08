import { Component, Input, OnInit } from '@angular/core';
import Post from 'src/model/post.model';
import Location from 'src/model/location.model';

@Component({
  selector: 'app-post-basic-info',
  templateUrl: './post-basic-info.component.html',
  styleUrls: ['./post-basic-info.component.scss'],
})
export class PostBasicInfoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loc = new Location(this.post.location);
  }

  @Input() post: Post = new Post({});
  loc: Location = new Location({});
}
