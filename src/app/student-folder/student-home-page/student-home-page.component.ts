import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class StudentHomePageComponent implements OnInit {

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


