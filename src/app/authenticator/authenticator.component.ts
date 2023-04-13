import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OidcClientNotification, OidcSecurityService, OpenIdConfiguration, UserDataResult } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { ServiceDispatcher } from '../ServiceDispatcher';
import { AuthService } from '../Inbox/auth.service';

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

  configuration: Observable<OpenIdConfiguration>;
  userDataChanged: Observable<OidcClientNotification<any>>;
  userData: Observable<UserDataResult>;

  isAuthenticated = false;
  
  psuEmail: string;
  psuID: string;
  userType: string;
  firstName: string;
  lastName: string;
  profileExists = false;
  //Checks user data and navigates to corresponding page after authentication
  constructor(private router: Router, private oidcSecurityService: OidcSecurityService, public serviceDispatcher: ServiceDispatcher) {
      this.oidcSecurityService = oidcSecurityService;
      
   }

  ngOnInit(): void {
    this.configuration = this.oidcSecurityService.getConfiguration();
    this.userData = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
      this.isAuthenticated = isAuthenticated;
      console.warn('authenticated: ', isAuthenticated);
    });
    this.authorizeUser();
  }

  

  authorizeUser() {
    //Check if user is student or faculty
    this.oidcSecurityService.checkAuth().subscribe(({ configId, isAuthenticated, userData, accessToken, idToken, errorMessage}) => {
      // console.log(userData);
      var user = JSON.parse(JSON.stringify(userData));
      console.log(user);
      //Isolate psuID
      this.psuEmail = user.unique_name;
      this.psuID = this.psuEmail.replace('@psu.edu', '');
      this.userType = user.extensionAttribute1;
      this.firstName = user.given_name;
      this.lastName = user.family_name;
      //Test line for userType
      /************************************** */
      // this.userType = "FACULTY";
      /************************************** */
      console.log(this.psuEmail);
      console.log(this.psuID);
      console.log(this.userType);
      console.log(this.firstName);
      console.log(this.lastName);

      // console.log('isStudent: ', this.userType === "STUDENT");
      // console.log('isFaculty: ', this.userType === "FACULTY");
      //If userType is STUDENT, check student table in database
      if(this.userType === "STUDENT" || this.userType === "EMPLOYEE") {
        console.log('Checking if student id exists in database...');
        this.serviceDispatcher.getStudent(this.psuID).subscribe(response => {
          console.log(response);
          if(response != null) {
            this.profileExists = true;
            console.log("User profile found in STUDENT table!");
          }
          else {
            this.profileExists = false;
            console.log("No profile found in STUDENT table");
          }
          this.redirectUser();
        });
      }
      //If userType is FACULTY, check faculty table in database
      else if(this.userType === "FACULTY") {
        console.log('Checking if faculty id exists in database...');
        this.serviceDispatcher.getFaculty(this.psuID).subscribe(response => {
          console.log(response);
          if(response != null) {
            this.profileExists = true;
            console.log("User profile found in FACULTY table!");
          }
          else {
            this.profileExists = false;
            console.log("No profile found in FACULTY table");
          }
          this.redirectUser();
        });
      }
    });
    
    
  }

  redirectUser() {
    //Navigate to corresponding webpage
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    console.log("Redirect User callled...");

    console.log(this.userType, ', ', this.profileExists)
    //Student Home Page
    if((this.userType === "STUDENT" || this.userType === "EMPLOYEE")  && this.profileExists) {
      this.router.navigate(['/student-home'], navigationExtras);
    }
    //Faculty Home Page
    else if(this.userType === "FACULTY" && this.profileExists) {
      this.router.navigate(['/faculty-home'], navigationExtras);
    }
    //Create Student Profile Page
    else if((this.userType === "STUDENT" || this.userType === "EMPLOYEE") && !(this.profileExists)) {
      this.router.navigate(['/create-student-page'], navigationExtras);
    }
    //Create Faculty Profile Page
    else if(this.userType === "FACULTY" && !(this.profileExists)) {
      this.router.navigate(['/create-faculty-page'], navigationExtras);
    }
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }



  
}
