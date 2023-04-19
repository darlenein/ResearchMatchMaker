import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  showModal = false;
  @Input() email: Email;
  psuID: string;

  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnChanges(): void {
    const text = this.email.text.replace(/\n/gi, `\n> `);

    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n---------- ${this.email.from} wrote:\n> ${text}`
    };
  }

  onSubmit(email: Email) {
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });

  }

  closeModal(){
    window.location.reload();
  }

}
