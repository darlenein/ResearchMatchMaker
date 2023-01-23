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
  max: number;
  num: number;
  value: number;
  first: number;
  second: number;

  constructor(private router: Router, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getResearchByFaculty('nii1').subscribe(response => {
      this.research = response
    });
  }

  goToOppBoardPage() {
    this.router.navigate(['/opp-board']);
  }

    getRandomNumber(){
    let max = 0;
    for (let i=0; i<this.research.length; i++){
        max++;
    }
    this.num = Math.random() * max | 0;
    return this.num;
  }

  getFirstNum(){
    this.first = this.getRandomNumber();
    return this.first;
  }

  getSecondNum(){
    this.second = this.getRandomNumber();
    return this.second;
  }

}


