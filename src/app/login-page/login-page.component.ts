import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
  }

  goToCreateFacultyPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "isStudent": false
      }
    };
    this.router.navigate(['/sso-page'], navigationExtras);
    //this.router.navigate(['/create-faculty-page']);
  }

  goToCreateStudentPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "isStudent": true
      }
    };
    this.router.navigate(['/sso-page'], navigationExtras);
    //this.router.navigate(['/create-student-page']);
  }

}
