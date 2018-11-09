import { JwtHelper } from 'angular2-jwt';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeopleService } from '../Services/people.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private jwtHelper: JwtHelper, private router: Router) {
  }

  isUserAuthenticated() {
    let token: string = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      //var dec = this.jwtHelper.decodeToken(token);
      //console.log(dec.email);
      return true;
    }
    else {
      return false;
    }
  }
  logOut() {
    localStorage.removeItem("jwt");
  }
}
