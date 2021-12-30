import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Board } from 'src/app/model/board';
import { PostService } from 'src/app/services/http/post/post.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss']
})
export class AddBoardComponent implements OnInit {

  boardName: string
  board: Board = new Board()

  constructor(private dialogRef: MatDialogRef<AddBoardComponent>, private postService: PostService) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();

  }

  onSave(){
    this.board.boardName = this.boardName
    let url = "http://localhost:8080/api/board/save"
    this.postService.postData(url, this.board).subscribe( res => {
      console.log(res)
      this.dialogRef.close(res);
    })
  }
}
