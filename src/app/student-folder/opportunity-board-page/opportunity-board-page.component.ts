import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/department.model';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-opportunity-board-page',
  templateUrl: './opportunity-board-page.component.html',
  styleUrls: ['./opportunity-board-page.component.css']
})
export class OpportunityBoardPageComponent implements OnInit {
  engineeringValue = new FormControl('');
  humanitiesValue = new FormControl('');
  politicalValue = new FormControl('');
  scienceValue = new FormControl('');
  nursingValue = new FormControl('');
  businessValue = new FormControl('');
  departments: DepartmentModel[];
  toggle = [false];
  engineeringItems: any[];
  politicalScienceItems: any[];
  humanitiesSocialScienceItems: any[];
  businessItems: any[];
  scienceItems: any[];
  nursingItems: any[];

  research: ResearchModel[];
  facultyID: string;

  
  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute) { 
        // this.route.queryParams.subscribe(params => {
    //   this.facultyID = params["facultyID"];
    // });
  }

  ngOnInit(): void {
    // get all departments
    this.serviceDispatcher.getAllDepartments().subscribe(response => { 
      this.departments = response;
      this.engineeringItems = this.getSubDepts(this.departments[0].id);
      this.politicalScienceItems = this.getSubDepts(this.departments[1].id);
      this.humanitiesSocialScienceItems = this.getSubDepts(this.departments[2].id);
      this.businessItems = this.getSubDepts(this.departments[3].id);
      this.scienceItems = this.getSubDepts(this.departments[4].id);
      this.nursingItems = this.getSubDepts(this.departments[5].id);
    });

    // get all research 
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response
    });
  }

  getSubDepts(id:number): any{
  let subdepartments: any[] = [];
    this.serviceDispatcher.getAllSubdeptByDeptId(id).subscribe(items => {
      items.map((item: any) => {
        subdepartments.push(item);
      });
    });
    return subdepartments;
  }

  separateByComma(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  goToProfile(id:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": id
      }
    };
    this.router.navigate(['/view-faculty-profile'], navigationExtras);
    //this.router.navigate(['']);
  }
}
