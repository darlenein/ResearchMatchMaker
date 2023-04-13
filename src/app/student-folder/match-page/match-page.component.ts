import { Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProgressModel } from 'src/app/models/progress.model';
import { CancelResearchDialogComponent } from '../cancel-research-dialog/cancel-research-dialog.component';
import { MatDialog } from '@angular/material/dialog';


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

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  
  ngOnInit(): void {
    this.serviceDispatcher.getAllResearchByStudent(this.psuID).subscribe(response => {
      this.research = response
      this.replaceInfoBySemicolon(this.research);
    });

    // this.serviceDispatcher.getAllResearchByStudent('dxi5017').subscribe(response => {
    //   this.research = response
    //   this.replaceInfoBySemicolon(this.research);
    // });
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.updateProgress(this.research);
    },1000);
  }

  updateProgress(researches : ResearchModel[]) {
    let num = 0;
    let stepAmt = 0;
    this.steppers.forEach(stepper => {
      if (researches[num].progress_Bar >= 4) {
        stepAmt = 3;
      }
      else {
        stepAmt = researches[num].progress_Bar;
      }
      // go through every step and check mark it 
      for(let i = 0; i <= stepAmt; i++) {
        stepper.selectedIndex = i;
      }
      num++;
    });
  }

  separateBySemicolon(rawText: String) {
    let text: string[] = [];
    if(rawText){
      text = rawText.split(';');
    }
    return text;
  }

  replaceInfoBySemicolon(researchArray: ResearchModel[]) {
    researchArray.forEach(research => {
      research.splitRequiredSkills = research.required_Skills.replace(/;/g, ',');
      research.splitEncouragedSkills = research.encouraged_Skills.replace(/;/g, ',');
      research.splitRequiredSkills = research.splitRequiredSkills.replace(/,\s*$/, "");
      research.splitEncouragedSkills = research.splitEncouragedSkills.replace(/,\s*$/, "");
    });
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
  this.openDialog('0ms', '0ms', p);
}

openDialog(enterAnimationDuration: string, exitAnimationDuration: string, p: ProgressModel): void {
  this.dialog.open(CancelResearchDialogComponent, {
    width: '500px',
    enterAnimationDuration,
    exitAnimationDuration,
    data: {
      applicationInfo: p
    }
  });
}

goToProfile(id:string){
  let navigationExtras: NavigationExtras = {
    queryParams: {
      "psuID": id
    }
  };
  this.router.navigate(['/view-faculty-profile'], navigationExtras);
}

  // --------------------------view research page------------------------
  goToViewResearchPage(id: number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "researchID": id,
      }
    };
    this.router.navigate(['/student-view-research-page'], navigationExtras)
  }
  
}
