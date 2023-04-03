import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { Email } from '../email';
import { StudentModel } from 'src/app/models/student.model';
import { FacultyModel } from 'src/app/models/faculty.model';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;
  updateEmail: Email;
  psuID: string;
  name: string;
  student: StudentModel[];
  faculty: FacultyModel[];

  constructor(private emailService: EmailService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];

    });

    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `@angular-email.com`
    }

    this.updateEmail = {
      id: '',
      to: `jpc6034@psu.edu`,
      subject: 'ResearchConnect Application',
      html: '',
      text: 'Your application has been updated! Please go check the status of your application on ResearchConnect!',
      from: `nii1@angular-email.com`
    }
   }

  ngOnInit(): void {
  
  }

  onSubmit(email: Email) {
    //send email
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

  sendUpdate(){
    //send email update
    this.emailService.sendEmail(this.updateEmail).subscribe(() => {
    });
  }
}
