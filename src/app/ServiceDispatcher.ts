import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from './models/student.model';
import { ProgressModel } from './models/progress.model';
import { FacultyModel } from './models/faculty.model';
import { ResearchModel } from './models/research.model';
import { FilterModel } from './models/filter.model';
import { StudentFilterModel } from './models/StudentFilter.model';
import { FacultyFilterModel } from "./models/FacultyFilter.model";

@Injectable({
  providedIn: 'root'
})

// holds all our backend calls 
export class ServiceDispatcher{
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Student';
    return this.http.get<any>(url);
  }

  public getFaculty(faculty_id : string): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Faculty/' + faculty_id;
    return this.http.get<any>(url);
  }

  public getAllFaculty(): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Faculty/getAllFaculty';
    return this.http.get<any>(url);
  }

  public createStudentProfile(s : StudentModel): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/createStudent';
    return this.http.post<any>(url, s);
  }

  public editStudentProfile(s : StudentModel): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/editStudent';
    return this.http.put<any>(url, s);
  }

  public createFacultyProfile(f : FacultyModel): Observable<any> {   
    const url = 'https://rmm.bd.psu.edu:8083/api/Faculty/createFaculty';
    return this.http.post<any>(url, f);
  }

  public editFacultyProfile(f : FacultyModel): Observable<any> {   
    const url = 'https://rmm.bd.psu.edu:8083/api/Faculty/editFaculty';
    return this.http.put<any>(url, f);
  }

  public createResearch(r : ResearchModel): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/createResearch';
    return this.http.post<any>(url, r);
  }

  public editResearch(r : ResearchModel): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/editResearch';
    return this.http.put<any>(url, r);
  }

  public getStudent(student_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/getStudentById/' + student_id;
    return this.http.get<any>(url);
  }

  public getAllStudents(): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/getAllStudents';
    return this.http.get<any>(url);
  }

  public getAllStudentsByResearch(research_id : number): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/getAllStudentsByResearch/' + research_id;
    return this.http.get<any>(url);
  }

  public getResearchByFaculty(faculty_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getResearchByFaculty/' + faculty_id;
    return this.http.get<any>(url);
  }

  public getResearchByID(id: number): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getResearchByID/' + id;
    return this.http.get<any>(url);
  }

  public getAllResearch(): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getAllResearch';
    return this.http.get<any>(url);
  }

  public getAllResearchByStudent(student_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getAllResearchByStudent/' + student_id;
    return this.http.get<any>(url);
  }

  public getAllSortedResearchByStudent(student_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getAllResearchSorted/' + student_id;
    return this.http.get<any>(url);
  }

  public getMatchedResearches(student_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getMatchedResearches/' + student_id;
    return this.http.get<any>(url);
  }

  public getSearchedResearchList(keyword : string, r: ResearchModel[]): Observable<any> {
    // API call to get the results of searched research list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getSearchedResearchList/' + keyword;
    return this.http.post<any>(url, r);
  }

  public getFilteredAndSearchedResearchList(f: FilterModel): Observable<any> {
    // API call to get the results of searched research list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getFilteredAndSearchedResearchList/';
    return this.http.post<any>(url, f);
  }

  public getFilteredResearchList(f: FilterModel): Observable<any> {
    // API call to get the results of filtered research list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getFilteredResearchList/';
    return this.http.post<any>(url, f);
  }

  public updateAppProgressBar(p : ProgressModel): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/updateAppProgress/';
    return this.http.put<any>(url, p);
  }

  public getAllDepartments(): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Department/getAllDepartments/';
    return this.http.get<any>(url);
  }

  public getAllSubdeptByDeptId(department_id : number): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Department/getAllSubDeptByDeptId/' + department_id;
    return this.http.get<any>(url);
  }

  public getAllSubdeptByResearchId(research_id : number): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Department/getAllSubDeptByResearchId/' + research_id;
    return this.http.get<any>(url);
  }

  public addResearchApplicant(p : ProgressModel): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/addResearchApplicant';
    return this.http.post<any>(url, p);
  }

  public deleteResearchApplicant(p : ProgressModel): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/deleteResearchApplicant';
    // return this.http.delete<any>(url);
    return this.http.request('delete', url, { body:p });
  }

  //Newly added below
  public getFilteredAndSearchStudentList(sf: StudentFilterModel): Observable<any> {
    // API call to get the results of searched student list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/GetFilteredAndSearchStudentList/';
    return this.http.post<any>(url, sf);
  }

  public getFilteredStudentList(sf: StudentFilterModel): Observable<any> {
    // API call to get the results of filtered student list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/getFilteredStudentList/';
    return this.http.post<any>(url, sf);
  }

  public getSearchedStudentList(keyword : string, s: StudentModel[]): Observable<any> {
    // API call to get the results of searched student list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/getSearchedStudentList/' + keyword;
    return this.http.post<any>(url, s);
  }

  public getAllSortedStudentByFaculty(faculty_id : string): Observable<any> {
    // find url on swagger UI
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/getAllStudentSorted/' + faculty_id;
    return this.http.get<any>(url);
  }

  public getFilteredAndSearchFacultyList(ff: FacultyFilterModel): Observable<any> {
    // API call to get the results of searched faculty list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Faculty/GetFilteredAndSearchFacultyList/';
    return this.http.post<any>(url, ff);
  }
  public getSearchedFacultyList(keyword : string, f: FacultyModel[]): Observable<any> {
    // API call to get the results of searched faculty list 
    const url = 'https://rmm.bd.psu.edu:8083/api/Faculty/getSearchedFacultyList/' + keyword;
    return this.http.post<any>(url, f);
  }

  public insertIntoResearchExclusions(student_id: string, research_id: number): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/insertIntoStudentHiddenResearch?student_id=' + student_id + '&research_id=' + research_id;
    return this.http.post<any>(url, null);
  }

  public deleteHiddenResearch(research_id : number, student_id: string): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/deleteHiddenResearch?research_id=' + research_id + '&student_id=' + student_id;
    return this.http.delete<any>(url);
  }

  public getHiddenResearchByStudentId(student_id: string): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Research/getHiddenResearchByStudentId/' + student_id;
    return this.http.get<any>(url);
  }

  public getAllRankedStudentsByResearch(research_id: string): Observable<any> {
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/getAllRankedStudentsByResearch/' + research_id;
    return this.http.get<any>(url);
  }

  public uploadStudentPicture(fileList: any, student_id: string): Observable<any> {
    let fileToUpload = <File>fileList[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    const url = 'https://rmm.bd.psu.edu:8083/api/Student/uploadStudentPicture/' + student_id;
    return this.http.post<any>(url, formData, {reportProgress: true, observe: 'events'})
  }
}


// helpful: https://www.tektutorialshub.com/angular/angular-http-get-example-using-httpclient/
