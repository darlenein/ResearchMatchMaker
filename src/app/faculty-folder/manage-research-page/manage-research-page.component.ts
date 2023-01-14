import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-manage-research-page',
  templateUrl: './manage-research-page.component.html',
  styleUrls: ['./manage-research-page.component.css']
})
export class ManageResearchPageComponent implements OnInit {
  psuID: string;
  research: ResearchModel[]; 

  constructor(private router: Router, private route: ActivatedRoute,public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getResearchByFaculty('nii1').subscribe(response => {
      this.research = response
    });
  }

  

  separateByComma(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  editResearchPage() {
    this.router.navigate(['/edit-research']);
  }

  addResearchPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/add-research'], navigationExtras);
  }

  viewApplicantsPage(research_id: number) {
    this.router.navigate(['/view-applicants'], {queryParams: {research_id: research_id}});
  }

}
