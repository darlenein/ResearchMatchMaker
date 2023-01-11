import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-faculty-page',
  templateUrl: './create-faculty-page.component.html',
  styleUrls: ['./create-faculty-page.component.css']
})
export class CreateFacultyPageComponent implements OnInit {
  first_name_val: string;
  firstName = new FormControl('');

  constructor(private router: Router) { 
  }

  ngOnInit(): void {

}

goToFacultyHomePage() {
  console.log(this.firstName.value);
  //this.router.navigate(['/faculty-home']);
}

}
