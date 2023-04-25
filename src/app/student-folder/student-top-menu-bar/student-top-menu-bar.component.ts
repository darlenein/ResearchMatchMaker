import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticatorComponent } from 'src/app/authenticator/authenticator.component';
import { AuthService } from 'src/app/Inbox/auth.service';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

interface UserCred {
  username: string;
  password: string;
}

@Component({
  selector: 'app-student-top-menu-bar',
  templateUrl: './student-top-menu-bar.component.html',
  styleUrls: ['./student-top-menu-bar.component.css']
})
export class TopMenuBarComponent implements OnInit {
  @Input() pageName: string;
  psuID: string;
  userName: string;
  student: any;
  defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private authenticator: AuthenticatorComponent, private serviceDispatcher: ServiceDispatcher) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getStudent(this.psuID).subscribe(response => {
      debugger;
      this.student = response;
    })
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

  signOut() {
    this.authenticator.logout();
  }

  studentClickInbox(){
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
        this.router.navigate(['/inbox-StudentHome'], navigationExtras)
      },
    });
  }

}
