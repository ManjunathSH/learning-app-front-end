import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { PostService } from 'src/app/services/http/post/post.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.scss']
})
export class AddAnswerComponent implements OnInit {

  question: Question
  answerText: string
  answerUrl: string
  constructor(private dialogRef: MatDialogRef<AddAnswerComponent>, @Inject(MAT_DIALOG_DATA) private data: any,
  private postService: PostService) { 
    this.question = this.data.question
  }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();

  }

  onSave(){
    let answer =  new Answer()
    answer.answerUrl = this.answerUrl
    answer.question = this.question
    answer.answerText = this.answerText
    let url = "http://localhost:8080/api/answer/save"
    this.postService.postData(url, answer).subscribe( res => {
      console.log(res)
      this.dialogRef.close(res);
    })
    
  }

  messageReceived(event: any){
    console.log("event receieved: " + event)
    this.answerUrl = event;
  }

}
