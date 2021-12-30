import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { Chapter } from 'src/app/model/chapter';
import { Subject } from 'src/app/model/subject';
import { GetService } from 'src/app/services/http/get/get.service';
import { AddChapterComponent } from '../add-chapter/add-chapter.component';
import { AddSubjectComponent } from '../add-subject/add-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  selectedBoardId: number
  selectedBoardName: string
  selectedClass: string
  selectedSubject: Subject
  showChapters: boolean

  subjects: Array<Subject>

  constructor(private router: Router, private getService: GetService, private dialog: MatDialog) {
    let selectedFields = this.router.getCurrentNavigation().extras.state
    if (selectedFields) {
      localStorage.setItem('selectedBoard', JSON.stringify(selectedFields))
    }
    else {
      selectedFields = JSON.parse(localStorage.getItem('selectedBoard'))
    }

    this.selectedBoardId = selectedFields.boardId
    this.selectedClass = selectedFields.class
    this.selectedBoardName = selectedFields.boardName
  }

  ngOnInit(): void {
    let url = "http://localhost:8080/api/subject/board/?boardId=" + this.selectedBoardId + "&class=" + this.selectedClass
    this.getService.getData(url).subscribe(
      (res: any) => {
        this.subjects = res
        console.log(this.subjects[0].subjectName)
      });
  }

  onSubjectClick(subject: Subject) {
    console.log(subject)
    this.selectedSubject = subject
    this.showChapters = true
  }


  onChapterClick(chapter: Chapter) {
    console.log(chapter)
    this.router.navigateByUrl('/question', {
      state: {
        chapter: chapter,
        subject: this.selectedSubject
      }
    })
  }

  addSubject() {
    let board = new Board()
    board.boardName = this.selectedBoardName
    board.boardId = this.selectedBoardId
    const dialogRef = this.dialog.open(AddSubjectComponent, {
      width: '300px',
      data: {selectedBoard: board, selectedClass: this.selectedClass},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result)
        this.subjects.push(result)
    });

  }
  
  addChapter(){
    let board = new Board()
    board.boardName = this.selectedBoardName
    board.boardId = this.selectedBoardId
    const dialogRef = this.dialog.open(AddChapterComponent, {
      width: '300px',
      data: {selectedSubject: this.selectedSubject,
        selectedBoard: board, selectedClass: this.selectedClass},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result)
        this.selectedSubject.chapters.push(result)
    });
  }
}
