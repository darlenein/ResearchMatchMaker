import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})
export class AuthCallbackComponent implements OnInit {
  
  constructor(private router: Router, private route:ActivatedRoute, private authService: AuthService) {
    
   }

  ngOnInit(): void {
      this.authService.completeAuthentication();
  }

  goToProfilePage(){
    

    
    this.router.navigate(['/create-student-page']);
    // this.router.navigate(['/create-faculty-page']);
  }


}
