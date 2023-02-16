import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './Inbox/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ResearchMatchMaker';
  signedin$: BehaviorSubject<boolean>;

  constructor(private router: Router, public oidcSecurityService: OidcSecurityService, private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

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
