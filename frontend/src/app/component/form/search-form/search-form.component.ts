import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';
import { PostService } from 'src/app/service/post.service';
import Location from 'src/model/location.model';
import Post, { PostFilter, REType } from 'src/model/post.model';
import Responce from 'src/model/responce.model';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  constructor(private ps: PostService, private ls: LocationService) {}

  ngOnInit(): void {
    this.ls.get().subscribe((d: Responce) => {
      this.loc = d.body;
    });
  }

  @Output() e = new EventEmitter<Post[]>();

  filter: PostFilter = new PostFilter();
  loc: Location[] = [];
  types: REType[] = [
    REType.APARTMENT,
    REType.COTTAGE,
    REType.HOUSE,
    REType.SHOP,
    REType.WAREHOUSE,
  ];

  search() {
    if (!this.filter.type) {
      alert('You must specify type of real estate for search');
      return;
    }
    this.ps
      .search({
        areaFrom: this.filter.areaFrom?.toString(),
        location: this.filter.location?.toString(),
        minRooms: this.filter.minRooms?.toString(),
        priceTo: this.filter.priceTo?.toString(),
        type: this.filter.type,
      })
      .subscribe((d: Responce) => {
        this.e.emit(d.body);
      });
  }
}
