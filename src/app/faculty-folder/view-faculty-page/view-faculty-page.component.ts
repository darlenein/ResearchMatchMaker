import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-view-faculty-page',
  templateUrl: './view-faculty-page.component.html',
  styleUrls: ['./view-faculty-page.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ViewFacultyPageComponent implements OnInit {

  faculty: any;
  splitResearchInterest: any;
  splitAboutMe: any;
  splitTitle: any;
  psuID: string;
  fpsuID: string;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
      this.fpsuID = params["facultyPSUID"];
    });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getFaculty(this.psuID).subscribe(response => {
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

  goToEditProfile(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/edit-faculty-profile'], navigationExtras);
  }

}
