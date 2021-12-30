import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chapter } from 'src/app/model/chapter';
import { Subject } from 'src/app/model/subject';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  subject : Subject


  constructor(private router: Router) { 
    this.subject = this.router.getCurrentNavigation().extras.state.subject
  }

  ngOnInit(): void {
  }

  onChapterClick(chapter: Chapter){
    console.log(chapter)
    this.router.navigateByUrl('/question', { state: { 
      chapter: chapter
    } })

  }

}
