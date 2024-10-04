import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { employee } from '../../models/employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

   employees :employee[]=[];

  constructor(private employeeService: EmployeeService,private router : Router,) {}

  async ngOnInit() {
    await this.loadEmployees();
  }

  async loadEmployees() {
    await this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employees', error);
      }
    );
  }


  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          this.loadEmployees(); 
        },
        (error) => {
          console.error('Error deleting employee', error);
        }
      );
    }
  }

  editEmployee(employee: employee) {
    console.log(employee);
    
    this.router.navigate(['employees'], { state: { employee } });
  }
  
}
