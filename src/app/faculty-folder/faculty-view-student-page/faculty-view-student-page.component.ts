import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-faculty-view-student-page',
  templateUrl: './faculty-view-student-page.component.html',
  styleUrls: ['./faculty-view-student-page.component.css']
})
export class FacultyViewStudentPageComponent implements OnInit {

  student: StudentModel[]; 
  splitSkills: any;
  splitResearchInterest: any;

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
      this.splitSkills = this.separateBySemicolon(student.skills);
      this.splitResearchInterest = this.separateBySemicolon(student.researchInterest);
    });
  }

  goToStudentProfile() {
    this.router.navigate(['/view-student-page'])
  }

}
