import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Email } from '../email';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {
  showModal = false;
  email: Email;
  psuID: string;

  constructor(private route: ActivatedRoute) {
    this.email = route.snapshot.data['email'];
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    })

    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }


  ngOnInit(): void {

  }

}
