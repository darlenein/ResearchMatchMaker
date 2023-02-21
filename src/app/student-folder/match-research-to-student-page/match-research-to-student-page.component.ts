import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProgressModel } from 'src/app/models/progress.model';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { ResearchApplicantDialogComponent } from '../research-applicant-dialog/research-applicant-dialog.component';

@Component({
  selector: 'match-research-to-student-page',
  templateUrl: './match-research-to-student-page.component.html',
  styleUrls: ['./match-research-to-student-page.component.css']
})
export class MatchResearchToStudentPageComponent implements OnInit {
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
    this.serviceDispatcher.getMatchedResearches(this.psuID).subscribe(response => {
      this.research = response
      this.replaceInfoBySemicolon(this.research);
    });

    // this.serviceDispatcher.getMatchedResearches('dxi5017').subscribe(response => {
    //   this.research = response
    //   this.replaceInfoBySemicolon(this.research);
    // });
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

  // apply to research
  applyToResearch(rID:number){
    let p = new ProgressModel();
    p.research_id = rID;
    p.student_id = this.psuID;
    this.openDialog('0ms', '0ms', p);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, p: ProgressModel): void {
    this.dialog.open(ResearchApplicantDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        applicationInfo: p
      }
    });
  }

}
