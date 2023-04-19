import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/department.model';
import { FilterModel, FilterValueModel } from 'src/app/models/filter.model';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-research-list-page',
  templateUrl: './research-list-page.component.html',
  styleUrls: ['./research-list-page.component.css']
})
export class ResearchListPageComponent implements OnInit {
  searchTerm = new FormControl('');
  engineeringValue = new FormControl('');
  humanitiesValue = new FormControl('');
  politicalValue = new FormControl('');
  scienceValue = new FormControl('');
  nursingValue = new FormControl('');
  businessValue = new FormControl('');
  status = new FormControl('');
  incentive = new FormControl('');
  location = new FormControl('');

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

  psuID: string;
  //filteredItems: string[] = [];
  filteredResearch: ResearchModel[];
  //searchFilteredResearch: ResearchModel[];
  fm: FilterModel = {
    research: [],
    filterValue: [],
    psuID: "",
    keyword: ""
  };

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response;
      this.replaceInfoBySemicolon(this.research);
      this.filteredResearch = this.research;
    });

    this.serviceDispatcher.getAllDepartments().subscribe(response => { 
      this.departments = response;
      this.engineeringItems = this.getSubDepts(this.departments[0].department_id);
      //this.politicalScienceItems = this.getSubDepts(this.departments[1].department_id);
      this.businessItems = this.getSubDepts(this.departments[1].department_id);
      this.humanitiesSocialScienceItems = this.getSubDepts(this.departments[2].department_id);
      this.scienceItems = this.getSubDepts(this.departments[3].department_id);
      this.nursingItems = this.getSubDepts(this.departments[4].department_id);
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

  replaceInfoBySemicolon(researchArray: ResearchModel[]) {
    researchArray.forEach(research => {
      research.splitRequiredSkills = research.required_Skills.replace(/;/g, ',');
      research.splitEncouragedSkills = research.encouraged_Skills.replace(/;/g, ',');
      research.splitRequiredSkills = research.splitRequiredSkills.replace(/,\s*$/, "");
      research.splitEncouragedSkills = research.splitEncouragedSkills.replace(/,\s*$/, "");
    });
  }

  goToProfile(id:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID,
        "facultyPSUID": id
      }
    };
    this.router.navigate(['/view-faculty-profile'], navigationExtras);
  }
  
  goToResearchPage(id:number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "researchID": id
      }
    };
    this.router.navigate(['/faculty-view-research-page'], navigationExtras);
  }

  // ---------------Filter and Search Function-------------------------
  FilterAndSearch(category:string, change:any){
    let fvm = new FilterValueModel();
    this.fm.research = this.research;
    this.fm.keyword = this.searchTerm.value!;

    if (change) {
    // add checked option to filtered value array
      if(change.options[0].selected === true) {
        fvm.categoryValue = category;
        fvm.checkedValue = change.options[0].value;
        this.fm.filterValue.push(fvm);
      }
      else {
        // remove the checked option from filtered value array
        this.fm.filterValue.forEach((element,index)=>{
          if(element.checkedValue == change.options[0].value) this.fm.filterValue.splice(index,1);
        });
      }
    }

    // get filtered research list
    this.serviceDispatcher.getFilteredAndSearchedResearchList(this.fm).subscribe(response => {
      this.filteredResearch = response;
      this.replaceInfoBySemicolon(this.filteredResearch);
    });
  }

}
