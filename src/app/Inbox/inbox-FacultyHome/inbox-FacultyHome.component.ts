import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { AuthenticatorComponent } from 'src/app/authenticator/authenticator.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

interface UserCred {
  username: string;
  password: string;
}

@Component({
  selector: 'app-inbox-FacultyHome',
  templateUrl: './inbox-FacultyHome.component.html',
  styleUrls: ['./inbox-FacultyHome.component.css']
})
export class InboxHomeComponent implements OnInit {
  @Input() pageName: string;
  psuID: string;

  constructor(private authService: AuthService, private authenticator: AuthenticatorComponent, private router: Router, private route: ActivatedRoute) {
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
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };

    this.authService.clickInbox(userCred).subscribe({
      next: () => {
        this.router.navigateByUrl('/inbox-FacultyHome', navigationExtras)
      },
    });
  }

  signOut() {
    this.authenticator.logout();
  }




}
