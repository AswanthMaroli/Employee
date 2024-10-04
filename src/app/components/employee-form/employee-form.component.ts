import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { employee } from '../../models/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {

  state$: Observable<any> | undefined;
  EmployeeData: employee = new employee();
  Submitted: boolean = false;
  IsValid: boolean = false;
  SuccessMessage: string='';

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute
    ,private router : Router,
  ) {
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state),);
   }

  async ngOnInit() {
    await this.state$?.subscribe((params) => {
      if (params.employee !== null && params.employee !== undefined) { this.EmployeeData = (params.employee); }
      console.log('employee', this.EmployeeData, params.employee);
    });
  }



  async onSubmit() {
    debugger;
    this.Submitted = true;
    this.IsValidated();
    if (!this.IsValid) {
      return;
    }
    this.employeeService.registerEmployee(this.EmployeeData).subscribe(response => {

      if (response.Saved == true) {
        console.log('Employee registered successfully', response);
        this.SuccessMessage="Save Success!" ;
        this.resetForm();
        this.Submitted = false;
        this.IsValid = true;
        this.router.navigate(['']);
      }

    });

  }

  resetForm() {
    this.EmployeeData = new employee();
  }

  async IsValidated() {
    this.IsValid = true;
    this.EmployeeData.FirstName = (this.EmployeeData.FirstName == '' ||
      this.EmployeeData.FirstName == null ||
      this.EmployeeData.FirstName == undefined) ?
      '' : this.EmployeeData.FirstName;

    this.EmployeeData.LastName = (this.EmployeeData.LastName == '' ||
      this.EmployeeData.LastName == null ||
      this.EmployeeData.LastName == undefined) ?
      '' : this.EmployeeData.LastName;

    this.EmployeeData.Email = (this.EmployeeData.Email == '' ||
      this.EmployeeData.Email == null ||
      this.EmployeeData.Email == undefined) ?
      '' : this.EmployeeData.Email;

    this.EmployeeData.Skills = (this.EmployeeData.Skills == '' ||
      this.EmployeeData.Skills == null ||
      this.EmployeeData.Skills == undefined) ?
      '' : this.EmployeeData.Skills;

    this.EmployeeData.PhoneNumber = (this.EmployeeData.PhoneNumber == '' ||
      this.EmployeeData.PhoneNumber == null ||
      this.EmployeeData.PhoneNumber == undefined) ?
      '' : this.EmployeeData.PhoneNumber;

    this.EmployeeData.Department = (this.EmployeeData.Department == '' ||
      this.EmployeeData.Department == null ||
      this.EmployeeData.Department == undefined) ?
      '' : this.EmployeeData.Department;

    this.EmployeeData.Position = (this.EmployeeData.Position == '' ||
      this.EmployeeData.Position == null ||
      this.EmployeeData.Position == undefined) ?
      '' : this.EmployeeData.Position;

    this.EmployeeData.Salary = (this.EmployeeData.Salary == '' ||
      this.EmployeeData.Salary == null ||
      this.EmployeeData.Salary == undefined) ?
      '' : this.EmployeeData.Salary;



    if (this.EmployeeData.FirstName == ''
      || this.EmployeeData.LastName == ''
      || this.EmployeeData.Department == ''
      || this.EmployeeData.Email == ''
      || this.EmployeeData.PhoneNumber == ''
      || this.EmployeeData.Position == ''
      || this.EmployeeData.Skills == ''
      || this.EmployeeData.Salary == ''
    ) {
       this.IsValid =  false;
    } else {
      this.IsValid = true;
    }

     return  this.IsValid;
  }

}
