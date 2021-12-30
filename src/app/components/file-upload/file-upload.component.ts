import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetService } from 'src/app/services/http/get/get.service';
import { PutService } from 'src/app/services/http/put/put.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  file: File = null;
  url: string = "";
  uploadSub: Subscription = new Subscription;
  uploadProgress: number;
  isUploadSuccess: boolean

  @Output() messageEvent = new EventEmitter<string>();


  constructor(private getService: GetService, private putService: PutService) { }

  ngOnInit(): void {

    this.getService.getData("https://mcy4yqx1d8.execute-api.ap-southeast-1.amazonaws.com/dev/presignedurl?key=newFile").subscribe(
      (res: any) => {
        console.log(res);
        this.url = res.preSignedUrl;
      }
    )
  }

  onSelectFile(event: any){
    this.file = event.target.files[0]
    console.log(event.target.files[0])
 
  }

  onUpload(){
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("file", this.file, this.file.name);

    this.uploadSub = this.putService.putData(this.url, formData, {
      reportProgress: true,
      observe: 'events'
      }).subscribe(
        (event:any) => {
          if (event.type == HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
          }
          if(event.type == HttpEventType.Response)
          {
            this.emitMessage()
          }
        }
    )

  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

  emitMessage(){
    this.messageEvent.emit(
      "newFile"
    )
  }
}
