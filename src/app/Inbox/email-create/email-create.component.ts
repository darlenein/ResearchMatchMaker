import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { FacultyModel } from 'src/app/models/faculty.model';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;
  psuID: string;

  constructor(private emailService: EmailService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];

      this.email = {
        id: '',
        to: '',
        subject: 'Sent From ResearchConnect',
        html: '',
        text: '',
        from: `${this.psuID}@angular-email.com`
      }

    });


   }

  ngOnInit(): void {
  
  }

  onSubmit(email: Email) {
    //send email
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
