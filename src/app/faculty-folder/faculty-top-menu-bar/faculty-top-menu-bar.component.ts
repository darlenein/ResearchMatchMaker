import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faculty-top-menu-bar',
  templateUrl: './faculty-top-menu-bar.component.html',
  styleUrls: ['./faculty-top-menu-bar.component.css']
})
export class FacultyTopMenuBarComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
  }

  goToProfileViewPage() {
    this.router.navigate(['/view-faculy-profile']);
  }

  goToEditProfilePage(){
    this.router.navigate(['/edit-faculty-profile']);
  }

  goToStudentListPage(){
    this.router.navigate(['/student-list']);
  }

  goToHomePage() {
    this.router.navigate(['/faculty-home']);
  }

  goToResearchPage() {
    this.router.navigate(['/faculty-research']);
  }

  goToResearchListPage() {
    this.router.navigate(['/research-list']);
  } 

}
