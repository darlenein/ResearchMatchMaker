import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-create-faculty-page',
  templateUrl: './create-faculty-page.component.html',
  styleUrls: ['./create-faculty-page.component.css']
})
export class CreateFacultyPageComponent implements OnInit {
  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  title = new FormControl('');
  dept = new FormControl(''); // do not think prof need dept (only need in research field)
  office = new FormControl('');
  phone = new FormControl('');
  about = new FormControl('');
  research = new FormControl('');
  link1 = new FormControl('');
  link2 = new FormControl('');
  link3 = new FormControl('');

  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router) { 
  }

  ngOnInit(): void {

}

goToFacultyHomePage() {
  //console.log(this.dept.value);
  let fd = new FacultyModel();
  fd.firstName = this.firstName.value!;
  fd.lastName = this.lastName.value!;
  fd.email = this.email.value!;
  fd.title = this.title.value!;
  fd.office = this.office.value!;
  fd.phone = this.phone.value!;
  fd.aboutMe = this.about.value!;
  fd.researchInterest  = this.research.value!;
  fd.link1 = this.link1.value!;
  fd.link2 = this.link2.value!;
  fd.link3 = this.link3.value!;
  // this.serviceDispatcher.createStudentProfile(sd).subscribe(response => { });
  this.router.navigate(['/faculty-home']); // should be success page -> log in -> faculty-home
}

}
