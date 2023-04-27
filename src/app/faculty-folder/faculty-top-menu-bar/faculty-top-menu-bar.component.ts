import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthenticatorComponent } from 'src/app/authenticator/authenticator.component';
import { AuthService } from 'src/app/Inbox/auth.service';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

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
  @Input() pageName: string;
  @Input() refresh: boolean;
  psuID: string;
  faculty: any;
  defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private authService: AuthService, 
    private authenticator: AuthenticatorComponent, private serviceDispatcher: ServiceDispatcher) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getFaculty(this.psuID).subscribe(response => {
      this.faculty = response;
    })
  }

  ngOnChanges(): void {
    setTimeout(()=>{
      this.ngOnInit();
    },100);
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
      },
    });

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    this.router.navigate(['/inbox-FacultyHome'], navigationExtras);
  }

  signOut() {
    this.authenticator.logout();
  }

}
