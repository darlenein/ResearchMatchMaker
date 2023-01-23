import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/department.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-research-list-page',
  templateUrl: './research-list-page.component.html',
  styleUrls: ['./research-list-page.component.css']
})
export class ResearchListPageComponent implements OnInit {

  research: any; 
  facultyID: string;
  researchDeptList: string[];
  departments: DepartmentModel[];
  toggle = [false];
  engineeringItems: any[];
  politicalScienceItems: any[];
  humanitiesSocialScienceItems: any[];
  businessItems: any[];
  scienceItems: any[];
  nursingItems: any[];

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    // this.route.queryParams.subscribe(params => {
    //   this.facultyID = params["facultyID"];
    // });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response
    });

    this.serviceDispatcher.getAllDepartments().subscribe(response => { 
      this.departments = response;
      this.engineeringItems = this.getSubDepts(this.departments[0].id);
      this.politicalScienceItems = this.getSubDepts(this.departments[1].id);
      this.humanitiesSocialScienceItems = this.getSubDepts(this.departments[2].id);
      this.businessItems = this.getSubDepts(this.departments[3].id);
      this.scienceItems = this.getSubDepts(this.departments[4].id);
      this.nursingItems = this.getSubDepts(this.departments[5].id);
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
