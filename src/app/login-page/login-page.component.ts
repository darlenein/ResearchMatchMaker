import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  goToFacultyHomePage() {
    this.router.navigate(['/faculty-home']);
  }

  goToStudentHomePage() {
    this.router.navigate(['/student-home']);
  }

}
