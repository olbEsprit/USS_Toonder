import { Component, OnInit, Injectable, Inject, } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Person } from '../../person';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
@Component({
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit {
  title: string = "Details";
  personId: string;
  errorMessage: any;
  person: Person;
  myAppUrl: string = "";

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _router: Router, private http: HttpClient, @Inject('BASE_URL') baseUrl: string, ) {
    if (this._avRoute.snapshot.params["id"]) {
      this.personId = this._avRoute.snapshot.params["id"];
    }
  }
  ngOnInit() {
    if (this.personId != null) {
      this.http.get(this.myAppUrl + 'api/mypage/getuserbyid/' + this.personId, {
        headers: new HttpHeaders({ "Content-Type": "application/json" })
      }).subscribe(response => {
        console.log(response);
        this.person = response;
        var today = new Date();
        var bd = new Date(this.person.birthday);
        var age = ((today - bd) / (31557600000));
        var age = Math.floor(age);
        this.person.age = age;
        this.person.birthday = bd.toDateString();
      }, err => console.log(err));
    }
  }



  cancel() {
    this._router.navigate(['/people-carouse']);
  }

}  

