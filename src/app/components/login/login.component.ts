import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  showSpinner: boolean;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  login() : void {
    console.log(this.username)
    console.log(this.password)
    this.showSpinner= true
    let resp = this.authService.authenticate(this.username, this.password).subscribe(resp => {
      this.showSpinner=false
      this.router.navigate(["dashboard"]);
    })

    console.log(resp)
    //  this.router.navigate(["dashboard"]);

  }
  
}
