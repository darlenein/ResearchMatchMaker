import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';
import { TopMenuBarComponent } from '../student-top-menu-bar/student-top-menu-bar.component';

@Component({
  selector: 'app-student-view-research-homepage',
  templateUrl: './student-view-research-homepage.component.html',
  styleUrls: ['./student-view-research-homepage.component.css'],
})

export class ViewResearchHomepageStudentComponent implements OnInit {
  psuID: string;
  research: ResearchModel[]; 
  researchPage: number;
  num: number;
  right: number;
  ynPaid: string;
  ynActive: string;


  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
      this.num = params["researchPage"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response
    });
  }

  goToViewResearchPage(index: number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID,
        "researchPage": index
      }
    };
    this.router.navigate(['/student-view-research-homepage'], navigationExtras)
  }

  getResearchPage(){
    this.num = this.researchPage;
    return this.num;
  }

  showPaidStatus(b: boolean){
    if (b == true){
      this.ynPaid = "Paid";
    }
    else {
      this.ynPaid = "Non-Paid";
    }
    return this.ynPaid;
  }

  showActiveStatus(b: boolean){
    if (b == true){
      this.ynActive = "Active";
    }
    else {
      this.ynActive = "Not-Active";
    }
    return this.ynActive;
  }


}
