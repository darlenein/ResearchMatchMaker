import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ServiceDispatcher } from '../ServiceDispatcher';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  psuEmail: string;
  psuID: string;
  userType: string;
  firstName: string;
  lastName: string;
  profileExists = false;
  
  constructor(private router: Router, private oidcSecurityService: OidcSecurityService, private serviceDispatcher: ServiceDispatcher) { }
  
  authorizeUser() {
    //User oidcSecurityService to begin complete authentication flow, subscribing for LoginResponse
    this.oidcSecurityService.checkAuth().subscribe(({ }) => {
      this.getUserData();
      this.findStoredUserProfile();
    });
  }

  getUserData() {
    this.oidcSecurityService.userData$.subscribe(({ userData }) => {
      var user = JSON.parse(JSON.stringify(userData));
      if(user == null || user == undefined) {
        console.log('userData returned ', user);
        return;
      }
      this.psuEmail = user.unique_name;
      this.psuID = this.psuEmail.replace('@psu.edu', '');
      this.userType = user.extensionAttribute1;
      this.userType = "FACULTY";
      this.firstName = user.given_name;
      this.lastName = user.family_name;
    });
  }

  findStoredUserProfile() {
    //If userType is STUDENT, check student table in database
    if(this.isStudent()) {
      this.serviceDispatcher.getStudent(this.psuID).subscribe(response => {
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
    else if(this.isFaculty()) {
      this.serviceDispatcher.getFaculty(this.psuID).subscribe(response => {
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
  }

  redirectUser() {
    //Navigate to corresponding webpage
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    //Student Home Page
    if(this.isStudent() && this.profileExists) {
      this.router.navigate(['/student-home'], navigationExtras);
    }
    //Faculty Home Page
    else if(this.isFaculty() && this.profileExists) {
      this.router.navigate(['/faculty-home'], navigationExtras);
    }
    //Create Student Profile Page
    else if(this.isStudent() && !(this.profileExists)) {
      this.router.navigate(['/create-student-page'], navigationExtras);
    }
    //Create Faculty Profile Page
    else if(this.isFaculty() && !(this.profileExists)) {
      this.router.navigate(['/create-faculty-page'], navigationExtras);
    }
    
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
  
  isLoggedIn() {
    let isLoggedIn = false;

    this.oidcSecurityService.isAuthenticated$.subscribe(({isAuthenticated}) => {
      isLoggedIn = isAuthenticated;
    });

    console.log('From AuthService - User Authenticated:', isLoggedIn);
    return isLoggedIn;
  }

  isStudent() {
    if(this.userType === "STUDENT") {
      // console.log('From AuthService - User is a Student', this.userType);
      return true;
    }
    else {
      // console.log('From AuthService - User is NOT a Student', this.userType);
      return false;
    }
  }

  isFaculty() {
    if(this.userType === "FACULTY" || this.userType === "EMPLOYEE") {
      // console.log('From AuthService - User is a Faculty or Employee', this.userType);
      return true;
    }
    else {
      // console.log('From AuthService - User is NOT a Faculty or Employee', this.userType);
      return false;
    }
  }

}
