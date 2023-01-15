import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class StudentHomePageComponent implements OnInit {
  psuID: string;
  research: ResearchModel[]; 

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
  }

  ngOnInit(): void {
    this.serviceDispatcher.getResearchByFaculty('nii1').subscribe(response => {
      this.research = response
    });
  }

  goToOppBoardPage() {
    this.router.navigate(['/opp-board']);
  }

  goToProfileViewPage() {
    this.router.navigate(['/profile-view']);
  }

  goToViewStudentPage() {
    this.router.navigate(['/view-student-profile']);
  }

  goToViewFacultyPage() {
    this.router.navigate(['/view-faculy-profile']);
  }

}


