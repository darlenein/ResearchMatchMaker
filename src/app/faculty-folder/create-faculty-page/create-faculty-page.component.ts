import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/Inbox/auth.service';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

//For inbox stuff
interface AccountCreate {
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'app-create-faculty-page',
  templateUrl: './create-faculty-page.component.html',
  styleUrls: ['./create-faculty-page.component.css']
})
export class CreateFacultyPageComponent implements OnInit {
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
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  uploadError = false;
  facultyProfilePicPath = "";


  constructor(private authService: AuthService, public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    //Inbox stuff 
    let accountCreate: AccountCreate = {
      username: this.psuID,
      password: this.psuID,
      passwordConfirmation: this.psuID
    }
    this.authService.createEmailAcc(accountCreate)
      .subscribe((response) => {
        console.log(response);
    });
    //Inbox stuff end
  }

  openFile() {
    document.querySelector('input')?.click();
  }

  handlePicture(fileList: any){
    this.uploadError = false;
    if(fileList[0].type.includes("image")) {
      if (fileList.length === 0) {
        return;
      }
      this.serviceDispatcher.uploadFacultyPictureForPath(fileList).subscribe(response =>{
        this.facultyProfilePicPath = response;
        this.progress = 100;
        this.message = "Upload success."
      });
    } else {
      alert("You must upload an image file (.jpg, .png, etc.).")
      return;
    }  
  }

  goToFacultyHomePage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };

    let fd = new FacultyModel();
    fd.faculty_Id = this.psuID;
    fd.first_Name = this.firstName.value!;
    fd.last_Name = this.lastName.value!;
    fd.email = this.email.value!;
    fd.title = this.title.value!;
    fd.office = this.office.value!;
    fd.phone = this.phone.value!;
    fd.about_Me = this.about.value!;
    fd.research_Interest  = this.research.value!;
    fd.link1 = this.link1.value!;
    fd.link2 = this.link2.value!;
    fd.link3 = this.link3.value!;
    fd.profile_Url = this.facultyProfilePicPath;
    this.serviceDispatcher.createFacultyProfile(fd).subscribe(response => { });

    if(!this.validate()){
      setTimeout(()=>{
        this.router.navigate(['/faculty-home'], navigationExtras);
      },1000);
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
