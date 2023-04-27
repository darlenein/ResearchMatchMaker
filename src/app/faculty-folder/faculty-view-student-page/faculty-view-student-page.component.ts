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
  studentID: string;

  constructor(private emailService: EmailService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.studentID = params["studentID"];
      this.psuID = params["psuID"];
    }); 

    //email template
      this.email = {
      id: '',
      to: `${this.studentID}@psu.edu`,
      subject: 'Sent From ResearchConnect',
      html: '',
      text: '',      
      from: `${this.psuID}@angular-email.com`
    }
  }

  ngOnInit(): void {
      this.serviceDispatcher.getStudent(this.studentID).subscribe(response => {
      this.student = response
      this.splitSkills = this.separateByComma(this.student.skills);
      this.splitResearchInterest = this.separateByComma(this.student.researchInterest);

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
