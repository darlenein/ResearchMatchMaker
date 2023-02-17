import { Component, OnInit } from '@angular/core';
import { AuthenticatorComponent } from '../authenticator/authenticator.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  
  constructor(private authenticator: AuthenticatorComponent) { }

  ngOnInit(): void {
    
  }
  
  signIn() {
    console.log("Attempting to log user into application..");
    console.log("Redirecting to Azure AD");
    this.authenticator.login();
  }

  

}
