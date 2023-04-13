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
  hiddenResearch: ResearchModel[];
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
      research.splitRequiredSkills = research.splitRequiredSkills.replace(/,\s*$/, "");
      research.splitEncouragedSkills = research.splitEncouragedSkills.replace(/,\s*$/, "");
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

  refreshSearch(){
    this.serviceDispatcher.getMatchedResearches(this.psuID).subscribe(response => {
      this.research = response
      this.replaceInfoBySemicolon(this.research);
    });

    this.onHiddenClick();
  }

  // Not interested logic
  onHideClick(research_id: number) {
    // insert into excluded_research table
    this.serviceDispatcher.insertIntoResearchExclusions(this.psuID,research_id).subscribe(response => {
    });

    // refresh searches
    setTimeout(()=>{
      this.refreshSearch();;
    },200);
  }

  onUnhideClick(research_id: number) {
    this.serviceDispatcher.deleteHiddenResearch(research_id, this.psuID).subscribe(response => {
    });

    setTimeout(()=>{
      this.refreshSearch();;
    },200);
    
  }

  //On Hidden Click logic
  onHiddenClick() {
    let checkBox = <HTMLInputElement> document.getElementById("isHidden");
    
    if(checkBox.checked == true) {
      this.serviceDispatcher.getHiddenResearchByStudentId(this.psuID).subscribe(response => {
        this.hiddenResearch = response
        this.replaceInfoBySemicolon(this.hiddenResearch);
      });
    } else {
      this.hiddenResearch = [];
    }
  }



}
