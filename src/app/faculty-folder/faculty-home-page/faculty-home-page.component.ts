import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
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
  max: number;
  num: number;
  value: number;
  first: number;
  second: number;

  
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response
    });

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
