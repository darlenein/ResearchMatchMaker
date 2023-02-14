import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-view-research-homepage',
  templateUrl: './view-research-homepage.component.html',
  styleUrls: ['./view-research-homepage.component.css']
})
export class ViewResearchHomepageFacultyComponent implements OnInit {
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
      this.researchPage = params["researchPage"];
    });
  }

  ngOnInit(): void {
      this.serviceDispatcher.getAllResearch().subscribe(response => {
        this.research = response
      });

      this.serviceDispatcher.getResearchByID(4).subscribe(response => {
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
    this.router.navigate(['./view-research-homepage'], navigationExtras)
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
