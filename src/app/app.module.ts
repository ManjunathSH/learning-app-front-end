import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { GetService } from './services/http/get/get.service';
import { PutService } from './services/http/put/put.service';
import { LoginComponent } from './components/login/login.component';

/**  Material Imports */
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BoardsComponent } from './components/boards/boards.component';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { PostService } from './services/http/post/post.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ChapterComponent } from './components/chapter/chapter.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { AddBoardComponent } from './components/add-board/add-board.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import { AddChapterComponent } from './components/add-chapter/add-chapter.component';
import { AnswersComponent } from './components/answers/answers.component';
import { AddAnswerComponent } from './components/add-answer/add-answer.component';
import { AddQuestionComponent } from './components/add-question/add-question.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    BoardsComponent,
    SubjectsComponent,
    NavBarComponent,
    ChapterComponent,
    QuestionsComponent,
    AddBoardComponent,
    AddSubjectComponent,
    AddChapterComponent,
    AnswersComponent,
    AddAnswerComponent,
    AddQuestionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    /** Material Design */
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [GetService,
    PutService,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
