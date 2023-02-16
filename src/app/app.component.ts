import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ResearchMatchMaker';

  constructor(private router: Router, public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    // console.log('Attempting to authenticate user...');
    // this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken, idToken }) => {
    //   /*...*/
    //   console.log('app authenticated', isAuthenticated);
    //   console.log('app userData', userData);
    //   console.log(`Current access token is '${accessToken}'`);
    //   console.log('app idToken', idToken);
    // });
  }
}
