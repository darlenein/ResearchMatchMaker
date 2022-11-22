import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';


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
  test: any;
  
  research: ResearchModel[]; 
  splitRequiredSkills: any;
  splitEncouragedSkills: any;

  constructor(public serviceDispatcher: ServiceDispatcher) { }

  
  ngOnInit(): void {
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

    this.test = this.steppers;
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
  
}
