import { Component, OnInit } from '@angular/core';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class MatchPageComponent implements OnInit {

  completed: boolean = false;
  state: string;
  
  research: ResearchModel[]; 
  splitRequiredSkills: any;
  splitEncouragedSkills: any;

  constructor(public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearchByStudent('dxi5017').subscribe(response => {
      this.research = response
      this.splitStudentsInformationBySemicolon(this.research);
    });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  splitStudentsInformationBySemicolon(researchArray: ResearchModel[]) {
    researchArray.forEach(research => {
      this.splitRequiredSkills = this.separateBySemicolon(research.required_skills);
      this.splitEncouragedSkills = this.separateBySemicolon(research.encouraged_skills);
    });
  }

  stepperDone() {
    this.completed = true;
    this.state = 'done';
  }
  
}
