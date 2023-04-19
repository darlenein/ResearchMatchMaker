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

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private authenticator: AuthenticatorComponent) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
  }


}
