import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  isStudent: boolean;

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
  }

  goToCreateFacultyPage() {
    this.isStudent = false;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "isStudent": this.isStudent
      }
    };

    this.router.navigate(['/sso-page'], navigationExtras);
    //this.router.navigate(['/create-faculty-page']);
  }

  goToCreateStudentPage() {
    this.isStudent = true;
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "isStudent": this.isStudent
      }
    };
    
    this.router.navigate(['/sso-page'], navigationExtras);
    //this.router.navigate(['/create-student-page']);
  }

}
