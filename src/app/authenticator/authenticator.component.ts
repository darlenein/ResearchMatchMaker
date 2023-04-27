import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { ServiceDispatcher } from '../ServiceDispatcher';
import { AuthService } from '../auth/auth.service';

//For inbox stuff
interface AccountCreate {
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  

  //Checks user data and navigates to corresponding page after authentication
  constructor(private authService: AuthService) {
   }

  ngOnInit(): void {
    this.authService.authorizeUser();
  }
  

  

  authorizeUser() {
    this.authService.authorizeUser();
  }

  redirectUser() {
    this.authService.redirectUser();
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }



  
}
