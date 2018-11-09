/*import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FetchEmployeeComponent } from '../fetch-employee/fetch-employee.component';
import { EmpserviceService } from '../../services/empservice.service';
import { Employee } from '../../employee';
@Component({
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit {
  title: string = "Details";
  employeeId: number;
  errorMessage: any;
  emp: Employee;
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _employeeService: EmpserviceService, private _router: Router) {
    if (this._avRoute.snapshot.params["id"]) {
      this.employeeId = this._avRoute.snapshot.params["id"];
    }
  }
  ngOnInit() {
    if (this.employeeId > 0) {
      this._employeeService.getEmployeeById(this.employeeId).subscribe(resp => this.emp = resp, error => this.errorMessage = error);
    }
  }
  
  cancel() {
    this._router.navigate(['/fetch-employee']);
  }

}  
*/
