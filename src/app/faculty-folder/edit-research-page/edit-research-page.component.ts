import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/department.model';
import { ResearchModel } from 'src/app/models/research.model';
import { SubDepartmentModel } from 'src/app/models/subdepartment.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-edit-research-page',
  templateUrl: './edit-research-page.component.html',
  styleUrls: ['./edit-research-page.component.css']
})
export class EditResearchPageComponent implements OnInit {

  name = new FormControl('');
  description = new FormControl('');
  location = new FormControl('');
  rskills = new FormControl('');
  eskills = new FormControl('');
  address = new FormControl('');
  startDate = new FormControl('');
  endDate = new FormControl('');
  active = new FormControl('');
  credit = new FormControl('');
  paid = new FormControl('');
  nonpaid = new FormControl('');
  engineeringValue = new FormControl('');
  humanitiesValue = new FormControl('');
  politicalValue = new FormControl('');
  scienceValue = new FormControl('');
  nursingValue = new FormControl('');
  businessValue = new FormControl('');
  research: any;
  researchID: number;
  psuID: string;
  researchDeptList: string[];
  departments: DepartmentModel[];
  toggle = [false];
  engineeringItems: any[];
  politicalScienceItems: any[];
  humanitiesSocialScienceItems: any[];
  businessItems: any[];
  scienceItems: any[];
  nursingItems: any[];
  
  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
     
      this.researchID = params["researchID"];

    });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getResearchByID(this.researchID).subscribe(response => {
      this.research = response
      this.name = new FormControl(this.research.name);
      this.description = new FormControl(this.research.description);
      this.location = new FormControl(this.research.location);
      this.rskills = new FormControl(this.research.required_skills);
      this.eskills = new FormControl(this.research.encouraged_Skills);
      this.address = new FormControl(this.research.address);
      this.startDate = new FormControl(this.research.start_Date);
      this.endDate = new FormControl(this.research.end_Date);
      this.active = new FormControl(this.research.active);
      this.credit = new FormControl(this.research.isCredit);
      this.paid = new FormControl(this.research.isPaid);
      this.nonpaid = new FormControl(this.research.isNonpaid);
      this.psuID = this.research.faculty_Id;
    });
    this.serviceDispatcher.getAllDepartments().subscribe(response => { 
      this.departments = response;
      this.engineeringItems = this.getSubDepts(this.departments[0].department_id);
      this.politicalScienceItems = this.getSubDepts(this.departments[1].department_id);
      this.humanitiesSocialScienceItems = this.getSubDepts(this.departments[2].department_id);
      this.businessItems = this.getSubDepts(this.departments[3].department_id);
      this.scienceItems = this.getSubDepts(this.departments[4].department_id);
      this.nursingItems = this.getSubDepts(this.departments[5].department_id);
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
  
  goToFacultyManageResearch() {  
    let navigationExtras: NavigationExtras = {
    queryParams: {
      "psuID": this.psuID
    }
  };
  debugger;
    this.researchDeptList = [...this.engineeringValue.value!, ...this.politicalValue.value!, ...this.businessValue.value!, 
      ...this.humanitiesValue.value!, ...this.scienceValue.value!, ...this.nursingValue.value!];
  
    let rm = new ResearchModel();
    rm.research_Id = this.researchID;
    rm.researchDepts = this.researchDeptList;
    rm.faculty_Id = this.psuID;
    rm.name = this.name.value!;
    rm.description = this.description.value!;
    rm.location = this.location.value!;
    rm.required_Skills = this.rskills.value!;
    rm.encouraged_Skills = this.eskills.value!;
    rm.start_Date = this.startDate.value!;
    rm.end_Date = this.endDate.value!;
    
    if (this.active.value === "active") {
      rm.active = true;
    }
    else rm.active = false;
    rm.address = this.address.value!;
    if (this.paid.value) {
      rm.isPaid = true;
    }
    else rm.isPaid = false;
    if (this.nonpaid.value) {
      rm.isNonpaid = true;
    }
    else rm.isNonpaid = false;
    if (this.credit.value) {
      rm.isCredit = true;
    }
    else rm.isCredit = false;
    
    this.serviceDispatcher.editResearch(rm).subscribe(response => { });
    this.router.navigate(['/faculty-research'], navigationExtras);
  }
  

}
