import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/model/board';
import { Subject } from 'src/app/model/subject';
import { PostService } from 'src/app/services/http/post/post.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  subjectName: string

  selectedBoard: Board
  selectedClass: string

  constructor(private dialogRef: MatDialogRef<AddSubjectComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
    private postService: PostService) {
    this.selectedBoard = this.data.selectedBoard
    this.selectedClass = this.data.selectedClass
   }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();
  }

  onSave(){
    let subject = new Subject()
    subject.subjectName = this.subjectName
    subject.className = this.selectedClass
    subject.board = this.selectedBoard
    let url = "http://localhost:8080/api/subject/save"
    this.postService.postData(url, subject).subscribe( res => {
      console.log(res)
      this.dialogRef.close(res);
    })
  }
}
