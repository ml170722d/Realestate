import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

class ImgData {
  constructor(public src?: string, public file?: File) {}

  pending?: boolean = false;
  status?: string = 'init';
}

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
})
export class UploadImgComponent implements OnInit {
  constructor(private fs: FileService) {}

  ngOnInit(): void {}

  @Input() url: string = '';
  @Input() id: string = '';
  selectedFile: ImgData = {};
  img: ImgData = {};
  @Output() ev = new EventEmitter();

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  uploadFile(f: any) {
    const file: File = f.files[0];
    const reader = new FileReader();
    console.log(file);

    reader.addEventListener('load', (e: any) => {
      console.log(e);
      this.selectedFile = new ImgData(e.target.result, f);

      this.fs
        .uploadFile(this.url, {
          id: this.id,
          avatar: this.selectedFile.file!,
        })
        .subscribe(
          (res) => {
            this.onSuccess();
          },
          (err) => {
            this.onError();
          }
        );
    });

    reader.readAsDataURL(file);
  }
}
