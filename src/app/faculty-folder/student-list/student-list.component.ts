import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  searchTerm = new FormControl('');

  student: StudentModel[]; 
  splitSkills: any;
  splitResearchInterest: any;
  studentID: string;

  GPA = new FormControl('');
  Major = new FormControl('');
  Location = new FormControl('');

  toggle = [false];

  filteredStudents: StudentModel[];
  location: StudentModel[];
  studentCopy: StudentModel[];
  temp: StudentModel[];


  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { 

  }

  ngOnInit(): void {
    this.serviceDispatcher.getAllStudents().subscribe(response => {
      this.student = response;
      this.studentCopy = this.student;
      this.splitStudentsInformationBySemicolon(this.student);
    });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  splitStudentsInformationBySemicolon(studentArray: StudentModel[]) {
    studentArray.forEach(student => {
      student.splitSkills = this.separateBySemicolon(student.skills);
    });
  }

  goToStudentProfile(id:String) {
    debugger;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "studentID": id
      }
    };
    this.router.navigate(['/faculty-view-student'], navigationExtras);
  }

  resetFilters(){
    this.serviceDispatcher.getAllStudents().subscribe(response => {
      this.student = response
      this.splitStudentsInformationBySemicolon(this.student);
    });
  }

  sortGPAAscending(){
    this.filteredStudents = this.student.sort((a, b) => a.gpa - b.gpa);
    return this.filteredStudents;

  }

  sortGPADescending(){
    this.filteredStudents = this.student.sort((a, b) => b.gpa - a.gpa);
    return this.filteredStudents;
  }

  //done
  GPAFilter(category:string, change:any){
    if (change){
      if (change.options[0].value === "ascending"){
        this.sortGPAAscending();
      } 
      else {
        this.sortGPADescending();
      }
    }
    //return this.filteredStudents;
  }

  //done just add more
  filterMajor(change:any){


    switch (change.options[0].value){
      
      case 'Software Engineer':
        

        for (let i=0; i<this.student.length; i++){
          while (this.student[i].major != "Software Engineer"){
            this.student.splice(i, 1);
          }
        }
      
      break;
        
      case 'test_major':
        for (let i=0; i<this.student.length; i++){
          while (this.student[i].major != "test_major"){
            this.student.splice(i,1);
          }
          this.filteredStudents.concat(this.temp);
        }
        //this.temp = this.student.concat(this.student[0]);

        
        
      break;
      
      }

  }

  //done
  MajorFilter(category:string, change:any){
    if (change){
      this.filterMajor(change);
    }
  }

  //done
  sortLocation(change:any){
    
    switch (change.options[0].value){
      
      case 'Online':
        for (let i=0; i<this.student.length; i++){
          while (this.student[i].preferLocation != "Online"){
            this.student.splice(i,1);
          }
        }
      break;

      case 'On-Campus':
        for (let i=0; i<this.student.length; i++){
          while (this.student[i].preferLocation != "On-Campus"){
            this.student.splice(i,1);
          }
        }
      break;

      case 'Both':
        for (let i=0; i<this.student.length; i++){
          while (this.student[i].preferLocation != "Both"){
            this.student.splice(i,1);
          }
        }
      break;
      }
  }

  LocationFilter(category:string, change:any){
    if (change){
      this.sortLocation(change);
    }
  }

  



}
