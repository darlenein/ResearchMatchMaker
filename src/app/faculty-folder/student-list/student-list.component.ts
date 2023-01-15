import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  student: StudentModel[]; 
  splitSkills: any;
  splitResearchInterest: any;
  studentID: string;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
    this.serviceDispatcher.getAllStudents().subscribe(response => {
      this.student = response
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

}
