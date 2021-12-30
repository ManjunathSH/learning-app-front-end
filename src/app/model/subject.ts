import { Board } from "./board"
import { Chapter } from "./chapter"

export class Subject { 
    subjectId: Number
    subjectName: string 
    className: string
    board: Board
    chapters: Array<Chapter>
}
