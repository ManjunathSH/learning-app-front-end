import { Question } from "./question"
import { Subject } from "./subject"

export class Chapter { 
    chapterId: Number
    chapterName: string 
    chapterNumber: string
    subject: Subject
    questions: Array<Question>
}
