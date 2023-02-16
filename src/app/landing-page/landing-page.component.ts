import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { AuthenticatorComponent } from '../authenticator/authenticator.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  
  constructor(private router: Router, private authenticator: AuthenticatorComponent) { }

  ngOnInit(): void {
    

    
  }
  
  signIn() {
    console.log("Attempting to log user into application..");
    console.log("Redirecting to Azure AD");
    this.authenticator.login();
  }

  

}
