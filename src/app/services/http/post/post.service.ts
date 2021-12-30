import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  postData(url: string, data: any, options?: any){
    return this.http.post(url, data, options)
}
}
