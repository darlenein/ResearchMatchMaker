import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-student-view-faculty-page',
  templateUrl: './student-view-faculty-page.component.html',
  styleUrls: ['./student-view-faculty-page.component.css']
})
export class StudentViewFacultyPageComponent implements OnInit {

  faculty: any;
  splitResearchInterest: any;
  splitAboutMe: any;
  splitTitle: any;
  facultyID: string;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.facultyID = params["facultyID"];
    });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getFaculty(this.facultyID).subscribe(response => {
      this.faculty = response
      this.splitResearchInterest = this.separateByComma(this.faculty.researchInterest);
      this.splitAboutMe = this.separateByComma(this.faculty.aboutMe);
      this.splitTitle = this.separateByComma(this.faculty.title);
    });

    // ---test---
    // this.serviceDispatcher.getFaculty('nii1').subscribe(response => {
    //   this.faculty = response
    //   this.splitResearchInterest = this.separateByComma(this.faculty.researchInterest);
    //   this.splitAboutMe = this.separateByComma(this.faculty.aboutMe);
    //   this.splitTitle = this.separateByComma(this.faculty.title);
    // });
  }

  separateByComma(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

}
