import {Component,  Inject} from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import {  Router,  ActivatedRoute} from '@angular/router';
import {  PeopleService} from '../../services/people.service'
import { Person } from '../../person'
@Component({
  selector: 'people-carousel',
  templateUrl: './people-carousel.component.html',
})
export class PeopleCarouserComponent {
  public pplList: Person[];

  constructor(public http: HttpClient, private _router: Router, private _peopleService: PeopleService) {
    this.getAllPeople();
  }

  getAllPeople() {
    this._peopleService.getAllPeople().subscribe(data => {
      this.pplList = data;
      this.getAge();
    });
    //this.getAge();
  }

  getAge() {
    var today = new Date();
    for (let ppl of this.pplList) {
      var bd = new Date(ppl.birthday);
      var age = ((today - bd) / (31557600000));
      var age = Math.floor(age);
      ppl.age = age;

    }
  }
    
}



