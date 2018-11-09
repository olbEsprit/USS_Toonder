import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
@Injectable()

@Component({
  selector: 'my-page',
  templateUrl: './my-page.component.html',
})

export class MyPageComponent {

  myAppUrl: string = "";

  constructor(private jwtHelper: JwtHelper, private router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  }

  update(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    console.log(credentials);
    let token: string = localStorage.getItem("jwt");
    if (token) {
      var tmail = this.jwtHelper.decodeToken(token);
    }
    else {
      this.router.navigate(["/login"]);
    }
    this.http.post(this.myAppUrl + 'api/mypage/update/' + tmail.email, credentials, {headers: new HttpHeaders({"Content-Type": "application/json"})
      }).subscribe(response => console.log(credentials), err => console.log(err));
  }


}
