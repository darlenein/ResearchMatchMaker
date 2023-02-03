import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { StudentModel } from 'src/app/models/student.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { ProgressModel } from 'src/app/models/progress.model';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ViewApplicantsComponent implements OnInit {
  @ViewChildren('stepper') steppers:QueryList<MatStepper>;
  completed: boolean = false;
  state: string;
  
  student: StudentModel[]; 
  splitSkills: any;
  research_id: any;


  constructor(private router: Router, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.student = [];
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => { 
      this.research_id = params['research_id'];
    })
    this.serviceDispatcher.getAllStudentsByResearch(this.research_id).subscribe(response => {
      this.student = response
      this.replaceStudentsInformationBySemicolon(this.student);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.updateProgress(this.student);
    },1000);
  }

  updateProgress(students : StudentModel[]) {
    let num = 0;
    this.steppers.forEach(stepper => {
      for(let i = 0; i <= students[num].progression; i++) {
        stepper.selectedIndex = i;
      }
      num++;
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

  goBack(stepper: MatStepper) {
    let lastSelectedIndex = stepper.selectedIndex;
    stepper.reset();
    for(let i = 0; i <= lastSelectedIndex; i++)
    {
      stepper.selectedIndex = i;
    }
    
  }

  goToStudentProfile(){
    this.router.navigate(['/goToStudentProfile']);
  }

  
  saveAppProgress(p : number, sID : string) {
    debugger;
    let pm = new ProgressModel();
    pm.progress = p;
    pm.research_id = Number(this.research_id);
    pm.student_id = sID;

    this.serviceDispatcher.updateAppProgressBar(pm).subscribe(response => {
    });
  }

  goToProfile(id:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": id
      }
    };
    this.router.navigate(['/view-student-profile'], navigationExtras);
  }

}
