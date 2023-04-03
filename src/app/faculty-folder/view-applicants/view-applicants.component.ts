import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { StudentModel } from 'src/app/models/student.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { ProgressModel } from 'src/app/models/progress.model';
import { FormControl } from '@angular/forms';
import { Email } from 'src/app/Inbox/email';
import { EmailCreateComponent } from 'src/app/Inbox/email-create/email-create.component';

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
  verdict = new FormControl('');
  
  student: StudentModel[]; 
  splitSkills: any;
  research_id: any;
  research_name: String;
  reject = 4;
  accept = 3;

  //Inbox stuff
  updateEmailSendForm: Email;
  studentPSUID: string;

  constructor(private router: Router, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.student = [];
    this.route.queryParams.subscribe(params => {
      this.studentPSUID = params["psuID"];
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => { 
      this.research_id = params['research_id'];
    })
    this.serviceDispatcher.getAllRankedStudentsByResearch(this.research_id).subscribe(response => {
      this.student = response
      this.replaceStudentsInformationBySemicolon(this.student);
      this.research_name = this.student[0].name;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.updateProgress(this.student);
    },1000);
  }

  // ------------ display info functions ---------------
  separateBySemicolon(rawText: String) {
    let text: string[] = [];
    if(rawText){
      text = rawText.split(';');
    }
    return text;
  }

  replaceStudentsInformationBySemicolon(studentArray: StudentModel[]) {
    studentArray.forEach(student => {
      student.skillsWithComma = student.skills.replace(/;/g, ',');
    });
  }

  // populate stepper progress bar
  updateProgress(students : StudentModel[]) {
   let num = 0;
    let stepAmt = 0;
    this.steppers.forEach(stepper => {
      if (students[num].progress_Bar >= 4) {
        stepAmt = 3;
      }
      else {
        stepAmt = students[num].progress_Bar;
      }
      // go through every step and check mark it 
      for(let i = 0; i <= stepAmt; i++) {
        stepper.selectedIndex = i;
      }
      num++;
    });
  }

  stepperDone() {
    this.completed = true;
    this.state = 'done';
  }

  // go backwards on stepper
  goBack(stepper: MatStepper) {
    let lastSelectedIndex = stepper.selectedIndex;
    stepper.reset();
    for(let i = 0; i <= lastSelectedIndex; i++)
    {
      stepper.selectedIndex = i;
    }
  }

   // save progress to database 
  saveAppProgress(p : any, sID : string) {
    debugger;
    let pm = new ProgressModel();
    pm.progress_Bar = Number(p);
    pm.research_id = Number(this.research_id);
    pm.student_id = sID;

    this.serviceDispatcher.updateAppProgressBar(pm).subscribe(response => {
    });

    setTimeout(()=>{
      location.reload();
    },1000);
  }

  // ------------- router methods -------------
  goToStudentProfile(){
    this.router.navigate(['/goToStudentProfile']);
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
