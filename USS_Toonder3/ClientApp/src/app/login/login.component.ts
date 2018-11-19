import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { Person } from "../person"
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  myAppUrl: string = "";
  private guser: SocialUser;
  private ouser: Person;
  private loggedIn: boolean;

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService) {
    this.myAppUrl = baseUrl;
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.guser = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        console.log(JSON.stringify(this.guser.idToken));
        this.auth();
        localStorage.setItem("jwt", this.guser.idToken);
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID,);
  }

  signOut(): void {
    this.authService.signOut();
  }


  auth() {
    this.http.post(this.myAppUrl + 'api/auth/googlelogin', JSON.stringify(this.guser.idToken), {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      console.log(response);
      this.router.navigate(["/"]);
      this.invalidLogin = false;
    }, err => {
      console.log(err);
      this.router.navigate(["/"]);
      this.invalidLogin = false;
      //this.invalidLogin = true;

    });
  }



  login(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    console.log(credentials);

    this.http.post(this.myAppUrl + 'api/auth/login', credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.invalidLogin = false;
      this.router.navigate(["/"]);
    }, err => {
      this.invalidLogin = true;
    });
  }


}
