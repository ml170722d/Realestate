import { Component, OnInit } from '@angular/core';
import Post from 'src/model/post.model';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  list: Post[] = [];
  resultTable: Post[] = [];
  page: number = 0;
  perPage: number = 10;

  setList(lst: Post[]) {
    this.list = lst;
    this.page = 0;

    this.updateResultTable();
  }

  nextPage() {
    if (this.resultTable.length < this.perPage) return;
    this.page++;
    this.updateResultTable();
  }

  prevPage() {
    if (this.page === 0) return;
    this.page--;
    this.updateResultTable();
  }

  updateResultTable() {
    this.resultTable = [];
    let start = this.page * this.perPage;
    let end = start + this.perPage;

    for (let i = start; i < end && i < this.list.length; i++) {
      this.resultTable.push(this.list[i]);
    }
  }
}
