import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {

  users = new Array<any>();

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
  }

  goToProfileViewPage() {
    this.router.navigate(['/profile-view']);
  }

  goToViewStudentPage() {
    this.router.navigate(['/view-student-profile']);
  }

  goToViewFacultyPage() {
    this.router.navigate(['/view-faculy-profile']);
  }

}


