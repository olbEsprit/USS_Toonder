import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from '../Services/people.service'
import { Subscription } from 'rxjs/Subscription';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import * as hello from "hellojs";
import { AuthService, GoogleLoginProvider, SocialUser } from "angularx-social-login";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent  {

  constructor(private jwtHelper: JwtHelper, private router: Router, private authService: AuthService) {
  }



  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }
    else {
      return false;
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
    this.authService.signOut();
  }
}
