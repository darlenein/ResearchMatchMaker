import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  logIn() {
    console.log("Attempting to log user into application..");
    console.log("Redirecting to Azure AD");
    
  }
}
