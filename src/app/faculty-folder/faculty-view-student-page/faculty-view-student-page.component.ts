import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { Email } from 'src/app/Inbox/email';
import { EmailService } from 'src/app/Inbox/email.service';

@Component({
  selector: 'app-faculty-view-student-page',
  templateUrl: './faculty-view-student-page.component.html',
  styleUrls: ['./faculty-view-student-page.component.css']
})
export class FacultyViewStudentPageComponent implements OnInit {

  student: any; 
  splitSkills: any;
  splitResearchInterest: any;
  psuID: string;

  //Inbox Stuff
  showModal = false;
  email: Email;

  constructor(private emailService: EmailService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["studentID"];
    }); 
  }

  ngOnInit(): void {
      this.serviceDispatcher.getStudent(this.psuID).subscribe(response => {
      this.student = response
      this.splitSkills = this.separateByComma(this.student.skills);
      this.splitResearchInterest = this.separateByComma(this.student.researchInterest);

      //email template
      this.email = {
        id: '',
        to: `${this.student.studentID}@psu.edu`,
        subject: '',
        html: '',
        text: '',      
        from: `${this.psuID}@angular-email.com`
      }
    });

    // this.serviceDispatcher.getStudent('dxi5017').subscribe(response => {
    //   this.student = response
    //   this.splitSkills = this.separateByComma(this.student.skills);
    //   this.splitResearchInterest = this.separateByComma(this.student.researchInterest);
    // });
 
  }

  separateByComma(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  goToStudentProfile(){
    this.router.navigate(['/faculty-view-student']);
  }

  //Inbox Stuff
  onSubmit(email: Email) {
    //send email
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
