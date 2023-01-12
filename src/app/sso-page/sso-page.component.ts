import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-sso-page',
  templateUrl: './sso-page.component.html',
  styleUrls: ['./sso-page.component.css']
})
export class SSOPageComponent implements OnInit {
  PSUID = new FormControl('');
  isStudent: any
  
  constructor(private router:Router, private route:ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.isStudent = params["isStudent"];
    });
  }

  ngOnInit(): void {
  }


  goToProfilePage(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.PSUID.value
      }
    };

    if(this.isStudent === "true") {
      this.router.navigate(['/create-student-page'], navigationExtras);
    }
    else {
      this.router.navigate(['/create-faculty-page'], navigationExtras);
    }
    
  }
}
