import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PutService {

  constructor(private http: HttpClient) { }

  putData(url: string, data: any, options?: any){
      return this.http.put(url, data, options)
  }
}
