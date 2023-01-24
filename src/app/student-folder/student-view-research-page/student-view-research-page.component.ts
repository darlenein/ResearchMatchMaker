import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';
import { TopMenuBarComponent } from '../student-top-menu-bar/student-top-menu-bar.component';

@Component({
  selector: 'app-student-view-research-page',
  templateUrl: './student-view-research-page.component.html',
  styleUrls: ['./student-view-research-page.component.css'],
})

export class ViewStudentResearchPageComponent implements OnInit {
  psuID: string;
  research: ResearchModel[]; 
  researchPage: number;
  num: number;
  right: number;
  ynPaid: string;
  ynActive: string;
  filteredResearch: ResearchModel[];


  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
      this.num = params["researchPage"];
      this.filteredResearch = params["fResearch"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response
    });

    this.serviceDispatcher.getAllSortedResearchByStudent(this.psuID).subscribe(response => {
      this.research = response;
      //this.filteredResearch = this.research;
    });
  }

  goToViewResearchPage(index: number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID,
        "researchPage": index
      }
    };
    this.router.navigate(['/student-view-research-page'], navigationExtras)
  }

  getResearchPage(){
    this.num = this.researchPage;
    return this.num;
  }

  goRight(){
    this.right = 1;
    return this.right = this.num + this.right;
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
