import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { StudentModel } from 'src/app/models/student.model';
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
  let sd = new FacultyModel();
  sd.firstName = this.firstName.value!;
  sd.lastName = this.lastName.value!;
  sd.email = this.email.value!;
  sd.title = this.title.value!;
  sd.office = this.office.value!;
  sd.phone = this.phone.value!;
  sd.aboutMe = this.about.value!;
  sd.researchInterest  = this.research.value!;
  sd.link1 = this.link1.value!;
  sd.link2 = this.link2.value!;
  sd.link3 = this.link3.value!;
  // this.serviceDispatcher.createStudentProfile(sd).subscribe(response => { });
  this.router.navigate(['/faculty-home']); // should be success page -> log in -> faculty-home
}

}
