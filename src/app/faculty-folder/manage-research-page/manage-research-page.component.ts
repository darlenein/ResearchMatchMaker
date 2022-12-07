import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-manage-research-page',
  templateUrl: './manage-research-page.component.html',
  styleUrls: ['./manage-research-page.component.css']
})
export class ManageResearchPageComponent implements OnInit {

  research: any; 

  constructor(private router: Router, private route: ActivatedRoute,public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
    debugger;
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
    this.router.navigate(['/add-research']);
  }

  viewApplicantsPage(research_id: number) {
    this.router.navigate(['/view-applicants'], {queryParams: {research_id: research_id}});
  }

}
