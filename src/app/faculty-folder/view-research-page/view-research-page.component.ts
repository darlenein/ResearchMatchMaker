import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-view-research-page',
  templateUrl: './view-research-page.component.html',
  styleUrls: ['./view-research-page.component.css']
})
export class ViewResearchPageComponent implements OnInit {
  psuID: string;
  research: ResearchModel[]; 
  researchPage: number;
  num: number;
  right: number;
  ynPaid: string;
  ynActive: string;


  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      //this.psuID = params["psuID"];
      this.researchPage = params["researchPage"];
      
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getResearchByFaculty('nii1').subscribe(response => {
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
    this.router.navigate(['./view-research-page'], navigationExtras)
  }

  getResearchPage(){
    this.num = this.researchPage;
    return this.num;
  }

  goRight(){
    this.right = 1;
    return this.right = this.num + this.right;
  }

  goToResearchPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/faculty-research'], navigationExtras);
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
