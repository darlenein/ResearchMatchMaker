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
  departments: DepartmentModel[];
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

  //view research page
  researchPage: number;
  
  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
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

  getSubDeptsByResearchID(id:number): any{
    let subdepartments: any[] = [];
    this.serviceDispatcher.getAllSubdeptByResearchId(id).subscribe(items => {
      items.map((item: any) => {
        subdepartments.push(item);
      });
    });
    return subdepartments;
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
    this.openDialog('0ms', '0ms');
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ResearchApplicantDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // // ------------------------------------ start filter functions ------------------------------------
  onDepartmentFilterClick(change: any) {
    this.filteredResearch = [];
    if(change.options[0].selected === true) {
      this.filteredItems.push(change.options[0].value);
      this.filteredItems.forEach(element => {
        let temp: any = [];
        temp = this.research.filter(x => x.researchDepts[0] === element || element === x.researchDepts[1] || element === x.researchDepts[2]);
        
        this.filteredResearch.forEach(r => {
          temp.forEach((t: { id: number; }) => {
            if(r.id == t.id) {
              const index = temp.indexOf(t, 0);
              if (index > -1) {
                temp.splice(index, 1);
              }
            }
          });
        });

        this.filteredResearch.push(...temp);
      });
    }
    else {
      this.filteredResearch = [];
      const index = this.filteredItems.indexOf(change.options[0].value, 0);
      if (index > -1) {
        this.filteredItems.splice(index, 1);
      }
      this.filteredItems.forEach(element => {
        let temp: any = [];
        debugger;
        temp = this.research.filter(x => x.researchDepts[0] === element || element === x.researchDepts[1] || element === x.researchDepts[2]);
        this.filteredResearch.push(...temp);
      });
      if (this.filteredResearch.length === 0){
        this.filteredResearch = this.research;
      }
    }
  }

  onStatusFilterClick(change: any) {
    this.filteredResearch = [];
    if(change.options[0].selected === true) {
      this.filteredItems.push(change.options[0].value);
      this.filteredItems.forEach(element => {
        let temp: any = [];
        if (element === "true") {
          temp = this.research.filter(x => x.active === true);
        }
        else temp = this.research.filter(x => x.active === false);
        this.filteredResearch.forEach(r => {
          temp.forEach((t: { id: number; }) => {
            debugger;
            if(r.id == t.id) {
              const index = temp.indexOf(t, 0);
              if (index > -1) {
                temp.splice(index, 1);
              }
            }
          });
        });

        this.filteredResearch.push(...temp);
      });
    }
    else {
      this.filteredResearch = [];
      const index = this.filteredItems.indexOf(change.options[0].value, 0);
      if (index > -1) {
        this.filteredItems.splice(index, 1);
      }
      this.filteredItems.forEach(element => {
        let temp: any = [];
        if (element === "true") {
          temp = this.research.filter(x => x.active === true);
        }
        else temp = this.research.filter(x => x.active === false);
        this.filteredResearch.push(...temp);
      });
      if (this.filteredResearch.length === 0){
        this.filteredResearch = this.research;
      }
    }
  }

  onLocationFilterClick(change: any) {
    this.filteredResearch = [];
    if(change.options[0].selected === true) {
      this.filteredItems.push(change.options[0].value);
      this.filteredItems.forEach(element => {
        let temp: any = [];
        temp = this.research.filter(x => x.location === element);
        this.filteredResearch.forEach(r => {
          temp.forEach((t: { id: number; }) => {
            if(r.id == t.id) {
              const index = temp.indexOf(t, 0);
              if (index > -1) {
                temp.splice(index, 1);
              }
            }
          });
        });

        this.filteredResearch.push(...temp);
      });
    }
    else {
      this.filteredResearch = [];
      const index = this.filteredItems.indexOf(change.options[0].value, 0);
      if (index > -1) {
        this.filteredItems.splice(index, 1);
      }
      this.filteredItems.forEach(element => {
        let temp: any = [];
        temp = this.research.filter(x => x.location === element);
        this.filteredResearch.push(...temp);
      });
      if (this.filteredResearch.length === 0){
        this.filteredResearch = this.research;
      }
    }
  }

  onIncentiveFilterClick(change: any) {
    this.filteredResearch = [];
    if(change.options[0].selected === true) {
      this.filteredItems.push(change.options[0].value);
      this.filteredItems.forEach(element => {
        let temp: any = [];
        let paid, nonpaid, credit;
        if (element === "Paid"){
          temp = this.research.filter(x => x.isPaid === true);
        }
        else if (element === "Nonpaid"){
          temp = this.research.filter(x => x.isNonpaid === true);
        }
        else if (element === "Credit"){
          temp = this.research.filter(x => x.isCredit === true);
        }

        this.filteredResearch.forEach(r => {
          temp.forEach((t: { id: number; }) => {
            debugger;
            if(r.id == t.id) {
              const index = temp.indexOf(t, 0);
              if (index > -1) {
                temp.splice(index, 1);
              }
            }
          });
        });

        this.filteredResearch.push(...temp);
      });
    }
    else {
      this.filteredResearch = [];
      const index = this.filteredItems.indexOf(change.options[0].value, 0);
      if (index > -1) {
        this.filteredItems.splice(index, 1);
      }
      this.filteredItems.forEach(element => {
        let temp: any = [];
        let paid, nonpaid, credit;
        if (element === "Paid"){
          temp = this.research.filter(x => x.isPaid === true);
        }
        else if (element === "Nonpaid"){
          temp = this.research.filter(x => x.isNonpaid === true);
        }
        else if (element === "Credit"){
          temp = this.research.filter(x => x.isCredit === true);
        }
        this.filteredResearch.push(...temp);
      });
      if (this.filteredResearch.length === 0){
        this.filteredResearch = this.research;
      }
    }
  } // ------------------------------------ end filter functions ------------------------------------

  //search function 
  getSearchedList(){
    if (this.searchTerm.value! === ""){
      this.filteredResearch = this.research;
    } else {
      this.serviceDispatcher.getSearchedResearchList(this.searchTerm.value!).subscribe(response => {
        this.filteredResearch = response;
      });
    }

  }


  //view research page
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
