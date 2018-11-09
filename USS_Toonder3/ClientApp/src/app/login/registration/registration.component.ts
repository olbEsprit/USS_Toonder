import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
@Injectable()


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent  {
  myAppUrl: string = "";
  isDone: boolean = false;


  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  registration(form: NgForm) {
    let credentials = JSON.stringify(form.value);
    console.log(credentials);
    this.http.post(this.myAppUrl + 'api/auth/register', credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => {
      console.log(response);
      this.isDone = true;
      this.router.navigate(["/login"]);
    }, err => console.log(err));




    /*{
      let token = (<any>response).token;
      localStorage.setItem("jwt", token);
      this.notDone = false;
      this.router.navigate(["/"]);
    }, err => {
      this.notDone = true;
    });*/
  }

}


