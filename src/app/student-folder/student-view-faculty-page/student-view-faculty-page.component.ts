import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { Email } from 'src/app/Inbox/email';
import { EmailService } from 'src/app/Inbox/email.service';

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
  psuID: string;

  //Inbox Stuff
  showModal = false;
  email: Email;

  constructor(private emailService: EmailService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.facultyID = params["facultyID"];
      this.psuID = params["psuID"];
    });

    //email template
    this.email = {
      id: '',
      to: `${this.facultyID}@psu.edu`,
      subject: 'Sent From ResearchConnect',
      html: '',
      text: '',      
      from: `${this.psuID}@angular-email.com`
    }
   }

  ngOnInit(): void {
    this.serviceDispatcher.getFaculty(this.facultyID).subscribe(response => {
      this.faculty = response
      this.splitResearchInterest = this.separateByComma(this.faculty.research_Interest);
      this.splitAboutMe = this.separateByComma(this.faculty.about_Me);
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

  //Inbox Stuff
  onSubmit(email: Email) {
    //send email
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
