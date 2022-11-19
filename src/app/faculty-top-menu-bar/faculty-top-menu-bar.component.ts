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
    this.router.navigate(['/profile-view']);
  }

  goToHomePage() {
    this.router.navigate(['/home-page']);
  }

  goToMatchPage() {
    this.router.navigate(['/view-matches']);
  }

  goToOppBoardPage() {
    this.router.navigate(['/opp-board']);
  }

}
