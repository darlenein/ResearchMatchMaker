import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { ResearchModel } from 'src/app/models/research.model';
import { StudentModel } from 'src/app/models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ViewApplicantsComponent implements OnInit {

  completed: boolean = false;
  state: string;
  
  student: StudentModel[]; 
  splitSkills: any;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
    this.serviceDispatcher.getAllStudentsByResearch(1).subscribe(response => {
      this.student = response
      this.replaceStudentsInformationBySemicolon(this.student);
    });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  replaceStudentsInformationBySemicolon(studentArray: StudentModel[]) {
    studentArray.forEach(student => {
      student.skillsWithComma = student.skills.replace(/;/g, ',');
    });
  }

  stepperDone() {
    this.completed = true;
    this.state = 'done';
  }

  goToStudentProfile(){
    this.router.navigate(['/goToStudentProfile']);
  }

}
