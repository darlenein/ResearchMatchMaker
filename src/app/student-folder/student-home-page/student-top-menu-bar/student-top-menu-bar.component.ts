import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-top-menu-bar',
  templateUrl: './student-top-menu-bar.component.html',
  styleUrls: ['./student-top-menu-bar.component.css']
})
export class TopMenuBarComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
  }

  goToProfileViewPage() {
    this.router.navigate(['/view-student-profile']);
  }

  goToEditProfilePage(){
    this.router.navigate(['/edit-student-profile']);
  }

  goToHomePage() {
    this.router.navigate(['/student-home']);
  }

  goToMatchPage() {
    this.router.navigate(['/view-matches']);
  }

  goToOppBoardPage() {
    this.router.navigate(['/opp-board']);
  }

  goToFacultyListPage(){
    this.router.navigate(['/faculty-list']);
  }

}
