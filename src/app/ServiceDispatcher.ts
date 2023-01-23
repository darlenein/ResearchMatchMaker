import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from './models/student.model';
import { ProgressModel } from './models/progress.model';
import { FacultyModel } from './models/faculty.model';
import { ResearchModel } from './models/research.model';

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

  public getFaculty(faculty_id : string): Observable<any> {
    const url = 'https://localhost:44390/api/Faculty/' + faculty_id;
    return this.http.get<any>(url);
  }

  public getAllFaculty(): Observable<any> {
    const url = 'https://localhost:44390/api/Faculty/getAllFaculty';
    return this.http.get<any>(url);
  }

  public createStudentProfile(s : StudentModel): Observable<any> {
    const url = 'https://localhost:44390/api/Student/createStudent';
    return this.http.post<any>(url, s);
  }

  public createFacultyProfile(f : FacultyModel): Observable<any> {   
    const url = 'https://localhost:44390/api/Faculty/createFaculty';
    return this.http.post<any>(url, f);
  }

  public createResearch(r : ResearchModel): Observable<any> {
    const url = 'https://localhost:44390/api/Research/createResearch';
    return this.http.post<any>(url, r);
  }

  public getStudent(student_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Student/getStudentById/' + student_id;
    return this.http.get<any>(url);
  }

  public getAllStudents(): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Student/getAllStudents';
    return this.http.get<any>(url);
  }

  public getAllStudentsByResearch(research_id : number): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Student/getAllStudentsByResearch/' + research_id;
    return this.http.get<any>(url);
  }

  public getResearchByFaculty(faculty_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Research/getResearchByFaculty/' + faculty_id;
    return this.http.get<any>(url);
  }

  public getAllResearch(): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Research/getAllResearch';
    return this.http.get<any>(url);
  }

  public getAllResearchByStudent(student_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Research/getAllResearchByStudent/' + student_id;
    return this.http.get<any>(url);
  }

  public getAllSortedResearchByStudent(student_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://localhost:44390/api/Research/getAllResearchSorted/' + student_id;
    return this.http.get<any>(url);
  }

  public updateAppProgressBar(p : ProgressModel): Observable<any> {
    const url = 'https://localhost:44390/api/Research/updateAppProgress/';
    return this.http.put<any>(url, p);
  }

  public getAllDepartments(): Observable<any> {
    const url = 'https://localhost:44390/api/Department/getAllDepartments/';
    return this.http.get<any>(url);
  }

  public getAllSubdeptByDeptId(department_id : number): Observable<any> {
    const url = 'https://localhost:44390/api/Department/getAllSubDeptByDeptId/' + department_id;
    return this.http.get<any>(url);
  }

  public getAllSubdeptByResearchId(research_id : number): Observable<any> {
    const url = 'https://localhost:44390/api/Department/getAllSubDeptByResearchId/' + research_id;
    return this.http.get<any>(url);
  }

  public addResearchApplicant(p : ProgressModel): Observable<any> {
    const url = 'https://localhost:44390/api/Research/addResearchApplicant';
    return this.http.post<any>(url, p);
  }

  public deleteResearchApplicant(p : ProgressModel): Observable<any> {
    const url = 'https://localhost:44390/api/Research/deleteResearchApplicant';
    // return this.http.delete<any>(url);
    return this.http.request('delete', url, { body:p });
  }
  

}


// helpful: https://www.tektutorialshub.com/angular/angular-http-get-example-using-httpclient/
