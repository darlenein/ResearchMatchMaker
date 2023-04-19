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
  psuID: string;

  constructor(private authService: AuthService, private authenticator: AuthenticatorComponent, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnInit(): void {

  }



}
