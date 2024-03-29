import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServiceDispatcher } from '../../ServiceDispatcher';
import { Email } from 'src/app/Inbox/email';
import { EmailService } from 'src/app/Inbox/email.service';
import { ResearchModel } from 'src/app/models/research.model';

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
  research: any;

  //Inbox Stuff
  showModal = false;
  email: Email;
  defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  constructor(private emailService: EmailService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
      this.fpsuID = params["facultyPSUID"];
    });

    //email template
    this.email = {
      id: '',
      to: `${this.fpsuID}@psu.edu`,
      subject: 'Sent From ResearchConnect',
      html: '',
      text: '',      
      from: `${this.psuID}@angular-email.com`
    }
   }

  ngOnInit(): void {
    this.serviceDispatcher.getFaculty(this.fpsuID).subscribe(response => {
      this.faculty = response
      this.splitResearchInterest = this.separateByComma(this.faculty.research_Interest);
      this.splitAboutMe = this.separateByComma(this.faculty.about_Me);
      this.splitTitle = this.separateByComma(this.faculty.title);
      
    });

    this.serviceDispatcher.getResearchByFaculty(this.fpsuID).subscribe(response => {
      this.research = response
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

  //Inbox Stuff
  onSubmit(email: Email) {
    //send email
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
