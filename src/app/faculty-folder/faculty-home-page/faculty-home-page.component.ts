import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-faculty-home-page',
  templateUrl: './faculty-home-page.component.html',
  styleUrls: ['./faculty-home-page.component.css']
})
export class FacultyHomePageComponent implements OnInit {
  psuID: string;
  research: ResearchModel[]; 
  
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getResearchByFaculty('nii1').subscribe(response => {
      this.research = response
    });
  }

  goToResearchPage() {
    this.router.navigate(['/faculty-research']);
  }

}
