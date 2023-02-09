import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { FormControl } from '@angular/forms';
import { StudentFilterModel, StudentFilterValueModel } from 'src/app/models/StudentFilter.model';


@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  searchTerm = new FormControl('');

  student: StudentModel[]; 
  splitSkills: any;
  splitResearchInterest: any;
  studentID: string;

  GPA = new FormControl('');
  Major = new FormControl('');
  Location = new FormControl('');
  Incentive = new FormControl('');

  toggle = [false];

  psuID: string;
  filteredStudents: StudentModel[];
  location: StudentModel[];
  studentCopy: StudentModel[];
  temp: StudentModel[];

  sm: StudentFilterModel = {
    student: [],
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
    this.serviceDispatcher.getAllStudents().subscribe(response => {
      this.student = response;
      this.studentCopy = this.student;
      this.splitStudentsInformationBySemicolon(this.student);
    });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  splitStudentsInformationBySemicolon(studentArray: StudentModel[]) {
    studentArray.forEach(student => {
      student.splitSkills = this.separateBySemicolon(student.skills);
    });
  }

  goToStudentProfile(id:String) {
    debugger;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "studentID": id
      }
    };
    this.router.navigate(['/faculty-view-student'], navigationExtras);
  }

  resetFilters(){
    this.serviceDispatcher.getAllStudents().subscribe(response => {
      this.student = response
      this.splitStudentsInformationBySemicolon(this.student);
    });
  }

  sortGPAAscending(){
    this.filteredStudents = this.student.sort((a, b) => a.gpa - b.gpa);
    return this.filteredStudents;

  }

  sortGPADescending(){
    this.filteredStudents = this.student.sort((a, b) => b.gpa - a.gpa);
    return this.filteredStudents;
  }

  //done
  GPAFilter(category:string, change:any){
    if (change){
      if (change.options[0].value === "ascending"){
        this.sortGPAAscending();
      } 
      else {
        this.sortGPADescending();
      }
    }
    //return this.filteredStudents;
  }

  FilterAndSearch(category:string, change:any){
    let svm = new StudentFilterValueModel();
    this.sm.student = this.student;
    this.sm.keyword = this.searchTerm.value!;

    if (change) {
    // add checked option to filtered value array
      if(change.options[0].selected === true) {
        svm.categoryValue = category;
        svm.checkedValue = change.options[0].value;
        this.sm.filterValue.push(svm);
      }
      else {
        // remove the checked option from filtered value array
        this.sm.filterValue.forEach((element,index)=>{
          if(element.checkedValue == change.options[0].value) this.sm.filterValue.splice(index,1);
        });
      }
    }

    // get filtered research list
    this.serviceDispatcher.getFilteredAndSearchedStudentList(this.sm).subscribe(response => {
      this.filteredStudents = response;
      this.splitStudentsInformationBySemicolon(this.filteredStudents);
    });
  }

  //done just add more
  

  



}
