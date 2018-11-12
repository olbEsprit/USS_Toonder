import { Component, OnInit, Injectable, Inject, Input, OnChanges } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Person } from '../../person';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';



@Injectable()

@Component({
  selector: 'my-page',
  templateUrl: './my-page.component.html',
  })


export class MyPageComponent implements OnInit {

  myAppUrl: string = "";

  form: FormGroup;
  user: Person;

  constructor(private jwtHelper: JwtHelper, private router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private fb: FormBuilder)
  {
   
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      birthday: [''],
      pictureUrl: [''],
      gender: [''],
      location: ['']
    });
  

    let token: string = localStorage.getItem("jwt");
    if (token) {
      var tmail = this.jwtHelper.decodeToken(token);
    }
    this.http.get(this.myAppUrl + 'api/mypage/getuserbyemail/' + tmail.email, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    }).subscribe(response => {
      console.log(response);
      this.user = response;
      this.populateForm();
    }, err => console.log(err));
  }


  private populateForm() {
    let date = this.user.birthday.split("T");
    this.form.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthday: date[0],
      pictureUrl: this.user.pictureUrl,
      gender: this.user.gender,
      location: this.user.location
    });
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
