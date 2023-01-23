import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-create-faculty-page',
  templateUrl: './create-faculty-page.component.html',
  styleUrls: ['./create-faculty-page.component.css']
})
export class CreateFacultyPageComponent implements OnInit {
  facultyForm: FormGroup;
  firstName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z -]*")]);
  lastName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z -]*")]);
  email = new FormControl('', [Validators.required, Validators.email]);
  title = new FormControl('');
  dept = new FormControl(''); // do not think prof need dept (only need in research field)
  office = new FormControl('');
  phone = new FormControl('');
  about = new FormControl('');
  research = new FormControl('');
  link1 = new FormControl('');
  link2 = new FormControl('');
  link3 = new FormControl('');
  psuID: string;


  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
  }

  openFile() {
    document.querySelector('input')?.click();
  }

  handle(e: any){
    console.log (e.value);
    // need to upload image to somewhere then
    // need to save into database
  }

  goToFacultyHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };

    let fd = new FacultyModel();
    fd.id = this.psuID;
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
    //this.serviceDispatcher.createFacultyProfile(fd).subscribe(response => { });

    if(!this.validate()){
      this.router.navigate(['/faculty-home'], navigationExtras);
    }
  }

  validate(): any {
    let hasError = false;

    if (this.firstName.invalid) {
      this.firstName.markAsDirty();
      hasError = true;
    }

    if (this.lastName.invalid) {
      this.lastName.markAsDirty();
      hasError = true;
    }

    if (this.email.invalid) {
      this.email.markAsDirty();
      hasError = true;
    }
    return hasError;
    
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getFirstNameErrorMessage() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a first name';
    }
    return this.firstName.hasError('pattern') ? 'Not a valid first name' : '';
  }

  getLastNameErrorMessage() {
    if (this.lastName.hasError('required')) {
      return 'You must enter a last name';
    }
    return this.lastName.hasError('pattern') ? 'Not a valid last name' : '';
  }


}
