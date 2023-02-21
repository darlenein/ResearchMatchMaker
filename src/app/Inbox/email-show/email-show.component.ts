import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { Email } from '../email';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email: Email;

  constructor(private route: ActivatedRoute, private emailService: EmailService) {
    this.route.params.subscribe(({email}) => {
      this.email = email;
    })
   }


  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(({ id }) => {
        return this.emailService.getEmail(id);
        })
      ).subscribe(email => {
        this.email = email;
    })
  }

}
