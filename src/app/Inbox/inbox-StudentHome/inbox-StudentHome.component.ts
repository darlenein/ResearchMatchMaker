import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticatorComponent } from 'src/app/authenticator/authenticator.component';
import { AuthService } from '../auth.service';


interface UserCred {
  username: string;
  password: string;
}

@Component({
  selector: 'app-inbox-StudentHome',
  templateUrl: './inbox-StudentHome.component.html',
  styleUrls: ['./inbox-StudentHome.component.css']
})
export class StudentHomeComponent implements OnInit {
  psuID: string;
  userName: string;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private authenticator: AuthenticatorComponent) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
  }

  //newly added
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
    this.router.navigate(['/match-researches'], navigationExtras);
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

  studentClickInbox(){
    let userCred: UserCred = {
      username: this.psuID,
      password: this.psuID
    }

    this.authService.clickInbox(userCred).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox-StudentHome')
      },
    });
  }

}
