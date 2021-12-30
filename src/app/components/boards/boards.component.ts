import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Board } from 'src/app/model/board';
import { GetService } from 'src/app/services/http/get/get.service';
import { AddBoardComponent } from '../add-board/add-board.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boards : Array<Board>
  clickedBoard: Board
  chosenClass : Number
  showClass = false;

  constructor(private getService: GetService, private _router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getService.getData("http://localhost:8080/api/board/").subscribe(
      (res: any) => {
        this.boards = res
        console.log(this.boards)
        // console.log(this.board.boardId)
      }
    )
  }

  onBoardClick(board: Board){
    console.log(board.boardId)
    this.clickedBoard = board
    this.showClass = true;

  }

  onClassClick(number: Number) {
    console.log(number)
    this.chosenClass = number
    this._router.navigateByUrl('/subject', { state: { 
      boardId: this.clickedBoard.boardId,
      class: this.chosenClass,
      boardName: this.clickedBoard.boardName
    } })
  }

  addBoard(){
    const dialogRef = this.dialog.open(AddBoardComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      if(result)
        this.boards.push(result)
    });


  }





}
