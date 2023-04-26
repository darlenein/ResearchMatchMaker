import { Component, OnInit, QueryList, ViewChildren, Input, Output, EventEmitter } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { StudentModel } from 'src/app/models/student.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { ProgressModel } from 'src/app/models/progress.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/Inbox/email.service';
import { Email } from 'src/app/Inbox/email';


interface UpdateEmail {
  id: string;
  subject: string;
  text: string;
  to: string;
  from: string;
  html: string;
}

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class ViewApplicantsComponent implements OnInit{
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
  studentPSUID: string;
  showModal = false;
  updateEmail: Email;
  psuID: string;



  constructor(private emailService: EmailService,private router: Router, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });

    this.student = [];

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => { 
      this.research_id = params['research_id'];
    })
    this.serviceDispatcher.getAllRankedStudentsByResearch(this.research_id).subscribe(response => {
      this.student = response
      this.replaceStudentsInformationBySemicolon(this.student);
      this.research_name = this.student[0].name;
      //this.studentPSUID = this.student[0].student_Id;
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
        //this.sendUpdateEmail();
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
    let pm = new ProgressModel();
    pm.progress_Bar = Number(p);
    pm.research_id = Number(this.research_id);
    pm.student_id = sID;
    this.studentPSUID = pm.student_id;

    this.serviceDispatcher.updateAppProgressBar(pm).subscribe(response => {
    });

    setTimeout(()=>{
      location.reload();
    },1000);

  }

  // ------------- router methods -------------
  goToStudentProfile(id:String) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "studentID": id,
        "facultyID": this.psuID
      }
    };
    this.router.navigate(['/faculty-view-student'], navigationExtras);
  }

  onSubmit(updateEmail: Email) {
    //send email
    this.emailService.sendEmail(updateEmail).subscribe(() => {
      this.showModal = false;
    });
  }

  //view notif form
  viewNotif(id: string){
      //this.studentPSUID = student.student_Id;
      //Notif
      this.updateEmail = {
      id: '',
      to: `${id}@psu.edu`,
      subject: 'ResearchConnect Application',
      html: '',
      text: 'Your application has been updated! Please go check the status of your application on ResearchConnect!',      
      from: `${this.psuID}@angular-email.com`
      };
  }


}
