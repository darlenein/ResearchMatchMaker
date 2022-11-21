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

  student: any; 
  splitSkills: any;
  splitResearchInterest: any;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
    this.serviceDispatcher.getStudent('dxi5017').subscribe(response => {
      this.student = response
      this.splitSkills = this.separateByComma(this.student.skills);
      this.splitResearchInterest = this.separateByComma(this.student.researchInterest);
    });
  }

  separateByComma(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  goToStudentProfile(){
    this.router.navigate(['/faculty-view-student']);
  }

}
