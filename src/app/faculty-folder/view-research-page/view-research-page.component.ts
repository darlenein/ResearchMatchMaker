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
  left: number;
  right: number;
  newResearchPage: number;


  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
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
 
  goLeft(){
    this.num -= 1;
    return this.num;
  }

  goRight(){
    this.num += 1;
    return this.num;
  }

  goToResearchPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/faculty-research'], navigationExtras);
  }


}
