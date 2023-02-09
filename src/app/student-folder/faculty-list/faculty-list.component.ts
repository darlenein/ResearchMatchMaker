import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

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
        "facultyID": id
      }
    };
    
    //this.serviceDispatcher.getFaculty('id').subscribe(response => {});
    this.router.navigate(['/student-view-faculty'], navigationExtras)
  }

}
