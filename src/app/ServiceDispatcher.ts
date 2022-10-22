import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from './models/student.model';

@Injectable({
  providedIn: 'root'
})

// holds all our backend calls 
export class ServiceDispatcher{
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Student';
    return this.http.get<any>(url);
  }
}


// helpful: https://www.tektutorialshub.com/angular/angular-http-get-example-using-httpclient/
