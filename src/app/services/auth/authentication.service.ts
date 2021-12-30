import { Injectable } from '@angular/core';
import { PostService } from '../http/post/post.service';
import { map } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private postService: PostService) { }

  authenticate(username: string, password: string) {
    return this.postService.postData("http://localhost:8080/authenticate", { userName: username, password: password })
      .pipe(
        map((response: any) => {
        sessionStorage.setItem("username", username);
        console.log(response)
        let tokenStr = "Bearer " + response.token;
        sessionStorage.setItem("token", tokenStr);
        
      }));
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }

}
