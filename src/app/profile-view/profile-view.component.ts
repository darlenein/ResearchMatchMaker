import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDispatcher } from '../ServiceDispatcher';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})

export class ProfileViewComponent implements OnInit {

  // variable to hold response back
  student: any;

  // injectables in here, kinda like import libraries and assign them to variables 
  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

  // whenever page first load, it will run this code:
  ngOnInit(): void {
    debugger;
    // calls GET endpoint from our ProfileManager.Student API
    this.serviceDispatcher.getUsers().subscribe(response => {
      this.student = response
    });
  }

  // function to navigate to home page 
  goToHomePage() {
    this.router.navigate(['/home-page']);
  }
}

