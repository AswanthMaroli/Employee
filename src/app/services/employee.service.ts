import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { SaveResponse } from '../models/Response';
import { employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  registerEmployee(employeeData: any): Observable<SaveResponse> {
    const url = `${this.apiUrl}/Employee/SaveEmployee`;
    return this.http.post<SaveResponse>(url, employeeData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }


  getEmployees(): Observable<employee[]> {
    const url = `${this.apiUrl}/Employee/GetEmployee`;
    return this.http.get<employee[]>(url , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }) 
    });
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete<SaveResponse>(`${this.apiUrl}/Employee/DeleteEmployee/${employeeId}`);
  }

 
}
