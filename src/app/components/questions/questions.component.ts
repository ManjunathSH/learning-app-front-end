import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/model/chapter';
import { GetService } from 'src/app/services/http/get/get.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'src/app/model/subject';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions : Array<Question>
  chapter: Chapter
  subject: Subject
  dataSource : MatTableDataSource<Question> 
  displayedColumns: string[] = ['questionText', 'options'];

  constructor(private _router: Router, private getService: GetService, private dialog: MatDialog) { 
    let stateParams = this._router.getCurrentNavigation().extras.state
    if(stateParams){
      localStorage.setItem('selectedSubject', JSON.stringify(stateParams))
    }
    else{
      stateParams = JSON.parse(localStorage.getItem('selectedSubject'))
    }
    this.chapter = stateParams.chapter
    this.subject = stateParams.subject
    console.log(this.chapter)
    console.log(this.subject)
  }

  ngOnInit(): void {
    let url = "http://localhost:8080/api/question/chapter/?chapterId="+ this.chapter.chapterId
    this.getService.getData(url).subscribe(
      (res: any) => {
        this.questions = res
        this.dataSource = new MatTableDataSource<Question>(this.questions);
        console.log(this.questions[0].questionText)
      });
  }

  view(row: Question){
    console.log(row)
    this._router.navigateByUrl('/answer', { state: {
      question: row

    }})
      
  }

  addQuestion(){
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '300px',
      data: {selectedChapter: this.chapter},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result)
        this.questions.push(result)
        this.dataSource.data = this.questions
    });
  }

  editQuestion(element: Question){
    console.log(element)
  }

}
