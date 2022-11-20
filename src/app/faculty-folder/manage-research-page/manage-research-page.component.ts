import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-manage-research-page',
  templateUrl: './manage-research-page.component.html',
  styleUrls: ['./manage-research-page.component.css']
})
export class ManageResearchPageComponent implements OnInit {

  research: any; 

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

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
    this.router.navigate(['/add-research']);
  }

  viewApplicantsPage() {
    this.router.navigate(['/view-applicants']);
  }

}
