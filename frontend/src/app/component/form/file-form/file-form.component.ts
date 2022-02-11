import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss'],
})
export class FileFormComponent implements OnInit {
  constructor(private fs: FileService) {}

  ngOnInit(): void {
    this.sub = this.ev.subscribe(() => this.upload());
  }

  ogOnDestroy() {
    this.sub.unsubscribe();
  }

  @Input() id: string;
  @Input() method: 'user' | 'post';
  @Input() single: boolean;

  @Input() ev: Observable<void>;
  private sub: Subscription;

  private data: any;

  select(ev: any) {
    this.data = ev.target.files;
  }

  upload() {
    if (this.data === undefined) return;
    if (this.method === 'user') {
      this.fs
        .upload('user', { id: this.id, pic: this.data[0] })
        .subscribe((d) => {});
      return;
    }

    if (this.method === 'post') {
      this.fs
        .upload('post', {
          id: this.id,
          pics: this.data.subarray(0, 5),
        })
        .subscribe((d) => {});
      return;
    }
  }
}
