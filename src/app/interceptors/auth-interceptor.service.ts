import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authData = window.btoa('manju' + ':' + 'pass');
// TODO look into this 
    if (req.url.includes("localhost")) {
      let token = ""
      if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {

        token = sessionStorage.getItem('token')
      }

      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `${token}`,
        },
      });

      return next.handle(req);
    }
    else
      return next.handle(req);
  }
}
