import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Answer } from 'src/app/model/answer';
import { Question } from 'src/app/model/question';
import { GetService } from 'src/app/services/http/get/get.service';
import { AddAnswerComponent } from '../add-answer/add-answer.component';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  question: Question
  answers: Array<Answer>

  constructor(private _router: Router, private getService: GetService,
    private dialog: MatDialog) {
    this.question = this._router.getCurrentNavigation().extras.state.question
  }

  ngOnInit(): void {
    let url = "http://localhost:8080/api/answer/question/?questionId=" + this.question.questionId
    this.getService.getData(url).subscribe(
      (res: any) => {
        this.answers = res
        for(let answer of this.answers )
        {
          this.getAnswerUrl(answer )
        }
        // this.dataSource = new MatTableDataSource<Question>(this.answers);
        // console.log(this.questions[0].questionText)
      });

  }

  addAnswer() {
    const dialogRef = this.dialog.open(AddAnswerComponent, {
      width: '400px',
      data: { question: this.question }
    });
  }

  getAnswerUrl(answer: Answer){
    console.log(answer)
    let url = "https://mcy4yqx1d8.execute-api.ap-southeast-1.amazonaws.com/dev/presignedurlget"
    this.getService.getData(url).subscribe(
      (res: any) => {
        answer.answerUrl =  res.preSignedUrl;
      })
    
  }


}
