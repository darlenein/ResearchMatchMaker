import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent implements OnInit {
  emails: any[];
  psuID: string;

  constructor(private router: Router, private route: ActivatedRoute, private emailService: EmailService) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnInit(): void {
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
    });


  }

}
