import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { FormControl } from '@angular/forms';
import { FacultyFilterModel, FacultyFilterValueModel } from 'src/app/models/FacultyFilter.model';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {

  faculty: FacultyModel[]; 
  splitAbout: any;
  splitResearchInterest: any;
  psuID: string;


  searchTerm = new FormControl('');
  // GPA = new FormControl('');
  // Major = new FormControl('');
  // Location = new FormControl('');
  // Incentive = new FormControl('');

  toggle = [false];

  filteredFaculty: FacultyModel[];

   fm: FacultyFilterModel = {
     faculty: [],
     facultyFilterValue: [],
     psuID: "",
     keyword: ""
   };
  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });

  }

  ngOnInit(): void {
    this.serviceDispatcher.getAllFaculty().subscribe(response => {
      this.faculty = response
      this.splitInformationBySemicolon(this.faculty);
    });
  }

  separateBySemicolon(rawText: String) {
    let text: string[] = [];
    if(rawText){
      text = rawText.split(';');
    }
    return text;
  }

  splitInformationBySemicolon(facultyArray: FacultyModel[]) {
    facultyArray.forEach(faculty => {
      faculty.splitAbout = this.separateBySemicolon(faculty.about_Me);
      faculty.splitResearchInterest = this.separateBySemicolon(faculty.research_Interest);
    });
  }

  goToFacultyProfile(id:String) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID,
        "facultyID": id
      }
    };
    this.router.navigate(['/student-view-faculty'], navigationExtras)
  }

  // ---------------Filter and Search Function-------------------------
  FilterAndSearch(category:string, change:any){
     let fvm = new FacultyFilterValueModel();
     this.fm.faculty = this.faculty;
     this.fm.keyword = this.searchTerm.value!;
    console.log(this.fm.keyword)
    
   //  if (change) {
    // add checked option to filtered value array
  //  //   if(change.options[0].selected === true) {
  //       fvm.categoryValue = category;
  //       fvm.checkedValue = change.options[0].value;
  //       this.fm.studentFilterValue.push(fvm);
  //     }
  //     else {
  //       // remove the checked option from filtered value array
  //       this.fm.studentFilterValue.forEach((element,index)=>{
  //         if(element.checkedValue == change.options[0].value) this.fm.studentFilterValue.splice(index,1);
  //       });
  //     }
  //  }

    // get filtered research list
    this.serviceDispatcher.getFilteredAndSearchFacultyList(this.fm).subscribe(response => {
      this.faculty = response;
      console.log(response);
      this.splitInformationBySemicolon(this.faculty);
    });
  }
}
