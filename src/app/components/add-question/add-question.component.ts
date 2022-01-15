import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chapter } from 'src/app/model/chapter';
import { Question } from 'src/app/model/question';
import { PostService } from 'src/app/services/http/post/post.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  selectedChapter: Chapter
  questionText: string
  questionTags: string

  constructor(private dialogRef: MatDialogRef<AddQuestionComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
  private postService: PostService) { 
    this.selectedChapter = this.data.selectedChapter
  }

  ngOnInit(): void {

  }

  onCancel(){
    this.dialogRef.close();
  }


  onSave(){
    let question = new Question()
    question.questionText = this.questionText
    question.chapter = this.selectedChapter
    let url = "http://localhost:8080/api/question/save"
    this.postService.postData(url, question).subscribe( res => {
      console.log(res)
      this.dialogRef.close(res);
    })
  }
}
