import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgressModel } from 'src/app/models/progress.model';


@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class MatchPageComponent implements OnInit {

  @ViewChildren('stepper') steppers:QueryList<MatStepper>;
  completed: boolean = false;
  state: string;
  
  research: ResearchModel[]; 
  splitRequiredSkills: any;
  splitEncouragedSkills: any;
  psuID: string;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  
  ngOnInit(): void {
    // this.serviceDispatcher.getAllResearchByStudent(this.psuID).subscribe(response => {
    //   this.research = response
    //   this.replaceInfoBySemicolon(this.research);
    // });

    this.serviceDispatcher.getAllResearchByStudent('dxi5017').subscribe(response => {
      this.research = response
      this.replaceInfoBySemicolon(this.research);
    });
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.updateProgress(this.research);
    },1000);
  }

  updateProgress(researches : ResearchModel[]) {
    let num = 0;
    this.steppers.forEach(stepper => {
      for(let i = 0; i < researches[num].progression; i++) {
        stepper.selectedIndex = researches[i].progression;
      }
      
      num++;
    });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  replaceInfoBySemicolon(researchArray: ResearchModel[]) {
    researchArray.forEach(research => {
      research.splitRequiredSkills = research.required_skills.replace(/;/g, ',');
      research.splitEncouragedSkills = research.encouraged_Skills.replace(/;/g, ',');
    });

  // splitStudentsInformationBySemicolon(researchArray: ResearchModel[]) {
  //   researchArray.forEach(research => {
  //     this.splitRequiredSkills = this.separateBySemicolon(research.required_skills);
  //     this.splitEncouragedSkills = this.separateBySemicolon(research.encouraged_skills);
  //   });
  }

  stepperDone() {
    this.completed = true;
    this.state = 'done';
  }

goBack(stepper: MatStepper){
    stepper.previous();
}

goForward(stepper: MatStepper){
    stepper.next();
}

deleteApplication(rID:number){
  let p = new ProgressModel();
  p.research_id = rID;
  p.student_id = this.psuID;
  // p.research_id = 1;
  // p.student_id = "abc123";
  //this.serviceDispatcher.deleteResearchApplicant(p).subscribe(response => {});
}
  
}
