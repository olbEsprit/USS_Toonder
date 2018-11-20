import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider, SocialUser, FacebookLoginProvider } from "angularx-social-login";
import { Person } from "../person"
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as Msal from 'msal';
import { User } from 'msal';
import { JwtHelper } from 'angular2-jwt';




@Injectable()

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})




export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  myAppUrl: string = "";
  mstoken: string;
  UserAgentApplication: Msal.UserAgentApplication;
  private guser: SocialUser;
  private loggedIn: boolean;

  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private authService: AuthService, private jwtHelper: JwtHelper) {
    this.myAppUrl = baseUrl;
  }

  ngOnInit() {
    this.UserAgentApplication = new Msal.UserAgentApplication("991b7b43-5261-42b3-98bc-8930cc35ed88", null, (errorDes, token, error, tokenType) => { });

    this.authService.authState.subscribe((user) => {
      this.guser = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.auth();
        localStorage.setItem("jwt", this.guser.idToken);
      }
    });
  }


  signInWithMS() {
    this.UserAgentApplication.loginPopup(['user.read']).then(token => {
      //this.mstoken = token;
      //console.log(JSON.stringify(this.jwtHelper.decodeToken(token)));
      this.http.post(this.myAppUrl + 'api/auth/mslogin', JSON.stringify(this.jwtHelper.decodeToken(token)), {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        })
      }).subscribe(response => {
        let localtoken = (<any>response).token;
        localStorage.setItem("jwt", localtoken);
        this.router.navigate(["/"]);
        this.invalidLogin = false;
      }, err => {
        console.log(err);
        //this.invalidLogin = false;
        this.invalidLogin = true;
        //this.router.navigate(["/"]);
        });
      //localStorage.setItem("jwt", token);

    });
  }



  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  check() {
    //console.log(JSON.stringify(this.jwtHelper.decodeToken(token)));
  }


  auth() {
    this.http.post(this.myAppUrl + 'api/auth/googlelogin', JSON.stringify(this.guser.idToken), {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      //console.log(response);
      this.router.navigate(["/"]);
      this.invalidLogin = false;
    }, err => {
      //console.log(err);
      //this.invalidLogin = false;
      this.invalidLogin = true;
      this.router.navigate(["/"]);
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


