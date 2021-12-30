import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChapterComponent } from './components/chapter/chapter.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AnswersComponent } from './components/answers/answers.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, },
  { path: 'subject', component: SubjectsComponent },
  { path: 'chapter', component: ChapterComponent },
  { path: 'question', component: QuestionsComponent },
  { path: 'answer', component: AnswersComponent },
  { path: 'fileUpload', component: FileUploadComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
