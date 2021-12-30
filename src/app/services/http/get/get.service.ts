import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private http: HttpClient) { }

  getData(url: string, options?: any) {
      return this.http.get(url, options)
          .pipe(
            catchError(error => {
              let errorMsg: string;
              if (error.error instanceof ErrorEvent) {
                errorMsg = `Error: ${error.error.message}`;
              } else {
                errorMsg = this.getServerErrorMessage(error);
              }

              return throwError(errorMsg);
          })
        );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
  }

}
