import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class PeopleService {
  myAppUrl: string = "";
  constructor(private http: Http, @Inject('BASE_URL') baseUrl: string) {
    this.myAppUrl = baseUrl;
  }

  getAllPeople() {
    /*this.http.get(this.myAppUrl + 'api/mypage/getallpeople', {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).subscribe(response => { return (response) }, err => { return (err) });*/
    return this.http.get(this.myAppUrl + 'api/mypage/getallpeople').map((response: Response) => response.json()).catch(this.errorHandler);
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}
