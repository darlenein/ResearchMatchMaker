import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticatorComponent } from 'src/app/authenticator/authenticator.component';

@Component({
  selector: 'app-student-top-menu-bar',
  templateUrl: './student-top-menu-bar.component.html',
  styleUrls: ['./student-top-menu-bar.component.css']
})
export class TopMenuBarComponent implements OnInit {
  psuID: string;

  constructor(private router: Router, private route: ActivatedRoute, private authenticator: AuthenticatorComponent) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnInit(): void {
  }

  goToProfileViewPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/view-student-profile'], navigationExtras);
  }

  goToEditProfilePage(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/edit-student-profile'], navigationExtras);
  }

  goToHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/student-home'], navigationExtras);
  }

  goToApplicationPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/view-matches'], navigationExtras);
  }

  goToMatchPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/research-matches'], navigationExtras);
  }

  goToOppBoardPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/opp-board'], navigationExtras);
  }

  goToFacultyListPage(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/faculty-list'], navigationExtras);
  }

  goToInboxStudentHomePage(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/inbox-StudentHome'], navigationExtras);
  }

  signOut() {
    this.authenticator.logout();
  }

}
