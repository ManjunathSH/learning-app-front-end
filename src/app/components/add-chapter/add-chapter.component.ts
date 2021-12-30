import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/model/board';
import { Chapter } from 'src/app/model/chapter';
import { Subject } from 'src/app/model/subject';
import { PostService } from 'src/app/services/http/post/post.service';

@Component({
  selector: 'app-add-chapter',
  templateUrl: './add-chapter.component.html',
  styleUrls: ['./add-chapter.component.scss']
})
export class AddChapterComponent implements OnInit {

  selectedSubject: Subject
  chapterName: string
  chapterNumber: string
  selectedBoard: Board
  selectedClass: string

  constructor(private dialogRef: MatDialogRef<AddChapterComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
  private postService: PostService) { 
    this.selectedSubject = this.data.selectedSubject
    this.selectedBoard = this.data.selectedBoard
    this.selectedClass = this.data.selectedClass
  }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();
  }

  onSave(){
    let chapter = new Chapter()
    chapter.chapterName = this.chapterName
    chapter.chapterNumber = this.chapterNumber
    chapter.subject = this.selectedSubject
    let url = "http://localhost:8080/api/chapter/save"
    this.postService.postData(url, chapter).subscribe( res => {
      console.log(res)
      this.dialogRef.close(res);
    })
  }

}
