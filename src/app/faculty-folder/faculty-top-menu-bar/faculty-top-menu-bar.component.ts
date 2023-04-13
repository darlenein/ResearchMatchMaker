import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticatorComponent } from 'src/app/authenticator/authenticator.component';
import { AuthService } from 'src/app/Inbox/auth.service';

interface UserCred {
  username: string;
  password: string;
}

@Component({
  selector: 'app-faculty-top-menu-bar',
  templateUrl: './faculty-top-menu-bar.component.html',
  styleUrls: ['./faculty-top-menu-bar.component.css']
})
export class FacultyTopMenuBarComponent implements OnInit {
  psuID: string;
  //userName: string;


  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private authService: AuthService, private authenticator: AuthenticatorComponent) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
  }

  goToProfileViewPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID,
        "facultyPSUID": this.psuID
      }
    };
    this.router.navigate(['/view-faculty-profile'], navigationExtras);
  }

  goToEditProfilePage(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/edit-faculty-profile'], navigationExtras);
  }

  goToStudentListPage(){

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }

    };
    this.router.navigate(['/student-list'], navigationExtras);
  }

  goToHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/faculty-home'], navigationExtras);
  }

  goToResearchPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/faculty-research'], navigationExtras);
  }

  goToResearchListPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/research-list'], navigationExtras);
  } 

  facultyClickInbox(){
    let userCred: UserCred = {
      username: this.psuID,
      password: this.psuID
    }

    this.authService.clickInbox(userCred).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox-FacultyHome')
      },
    });
  }

  signOut() {
    this.authenticator.logout();
  }

}
