import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/department.model';
import { ProgressModel } from 'src/app/models/progress.model';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';
import { ResearchApplicantDialogComponent } from '../research-applicant-dialog/research-applicant-dialog.component';
import { StudentModel } from 'src/app/models/student.model';
import { SubDepartmentModel } from 'src/app/models/subdepartment.model';
import { MatListOption, MatSelectionListChange } from '@angular/material/list';
import { FilterModel, FilterValueModel } from 'src/app/models/filter.model';

@Component({
  selector: 'app-opportunity-board-page',
  templateUrl: './opportunity-board-page.component.html',
  styleUrls: ['./opportunity-board-page.component.css']
})
export class OpportunityBoardPageComponent implements OnInit {
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
  departments: DepartmentModel[] = [];
  toggle = [false];
  engineeringItems: any[];
  politicalScienceItems: any[];
  humanitiesSocialScienceItems: any[];
  businessItems: any[];
  scienceItems: any[];
  nursingItems: any[];

  sortedResearch: ResearchModel[];
  research: ResearchModel[];
  separatedRequiredSkills: string;
  separateEncouragedSkills: string;
  facultyID: string;
  psuID: string;
  researchSubdepts: SubDepartmentModel[];
  filteredItems: string[] = [];
  filteredResearch: ResearchModel[];
  fm: FilterModel = {
    research: [],
    filterValue: [],
    psuID: "",
    keyword: ""
  };

  //view research page
  researchPage: number;
  
  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
      this.fm.psuID = this.psuID;
    });
  }

  ngOnInit(): void {
    // get all departments
    this.serviceDispatcher.getAllDepartments().subscribe(response => { 
      this.departments = response;
      this.engineeringItems = this.getSubDepts(this.departments[0].department_id);
      this.politicalScienceItems = this.getSubDepts(this.departments[1].department_id);
      this.humanitiesSocialScienceItems = this.getSubDepts(this.departments[2].department_id);
      this.businessItems = this.getSubDepts(this.departments[3].department_id);
      this.scienceItems = this.getSubDepts(this.departments[4].department_id);
      this.nursingItems = this.getSubDepts(this.departments[5].department_id);
    });

    this.serviceDispatcher.getAllSortedResearchByStudent(this.psuID).subscribe(response => {
      this.research = response;
      this.replaceInfoBySemicolon(this.research);
      this.filteredResearch = this.research;
    });

    // this.serviceDispatcher.getAllResearch().subscribe(response => {
    //   this.research = response;
    //   this.filteredResearch = response;
    //   });
  }

  replaceInfoBySemicolon(researchArray: ResearchModel[]) {
    researchArray.forEach(research => {
      research.splitRequiredSkills = research.required_Skills.replace(/;/g, ',');
      research.splitEncouragedSkills = research.encouraged_Skills.replace(/;/g, ',');
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
  }

  applyToResearch(rID:number){
    let p = new ProgressModel();
    p.research_id = rID;
    p.student_id = this.psuID;
    //this.serviceDispatcher.addResearchApplicant(p).subscribe(response => {});
    this.openDialog('0ms', '0ms', p);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, p: ProgressModel): void {
    this.dialog.open(ResearchApplicantDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        applicationInfo: p
      }
    });
  }

  // // ------------------------------------ start filter functions ------------------------------------

  FilterOnClick(category:string, change:any){
    let fvm = new FilterValueModel();
    debugger;
    this.fm.research = this.filteredResearch;

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

    // get filtered research list
    this.serviceDispatcher.getFilteredResearchList(this.fm).subscribe(response => {
      this.filteredResearch = response;
      this.replaceInfoBySemicolon(this.filteredResearch);
    });
  }

  // ------------------------------------ end filter functions ------------------------------------

  //search function 
  getSearchedList(){

    // if search field empty, get filtered list using filters and not by search term
    if (this.searchTerm.value! === ""){
      this.serviceDispatcher.getFilteredResearchList(this.fm).subscribe(response => {
        this.filteredResearch = response;
        this.replaceInfoBySemicolon(this.filteredResearch);
      });
    }
    // if filter value is empty (no filtered checked), filter by search term
    else if (this.fm.filterValue){
      this.serviceDispatcher.getSearchedResearchList(this.searchTerm.value!, this.filteredResearch).subscribe(response => {
        this.filteredResearch = response;
        this.replaceInfoBySemicolon(this.filteredResearch);
      });
    } 
    // else filter the whole research list by search term 
    else {
      this.serviceDispatcher.getSearchedResearchList(this.searchTerm.value!, this.research).subscribe(response => {
        this.filteredResearch = response;
        this.replaceInfoBySemicolon(this.filteredResearch);
      });
    }

  }

  // ---------------Filter and Search Function-------------------------
  FilterAndSearch(category:string, change:any){
    let fvm = new FilterValueModel();
    debugger;
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


  // --------------------------view research page------------------------
  goToViewResearchPage(index: number){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID,
        "researchPage": index,
        "fResearch": this.filteredResearch,
      }
    };
    this.router.navigate(['/student-view-research-page'], navigationExtras)
  }
}
