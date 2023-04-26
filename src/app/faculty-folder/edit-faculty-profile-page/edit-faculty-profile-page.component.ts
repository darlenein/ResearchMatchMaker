import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-edit-faculty-profile-page',
  templateUrl: './edit-faculty-profile-page.component.html',
  styleUrls: ['./edit-faculty-profile-page.component.css']
})
export class EditFacultyProfilePageComponent implements OnInit {

  firstName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z -]*")]);
  lastName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z -]*")]);
  email = new FormControl('',  [Validators.required, Validators.email]);
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
  fpsuID: string;
  faculty: any;
  progress: number;
  message: string;
  uploadError = false;
  @Output() public onUploadFinished = new EventEmitter();
  shouldRefresh = true;
  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["facultyPSUID"];
      this.psuID = params["psuID"];
     
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getFaculty(this.psuID).subscribe(response => {
      this.faculty = response
      this.firstName = new FormControl(this.faculty.first_Name,[Validators.required, Validators.pattern("[a-zA-Z -]*")]);
      this.lastName = new FormControl(this.faculty.last_Name,[Validators.required, Validators.pattern("[a-zA-Z -]*")]);
      this.email = new FormControl(this.faculty.email,[Validators.required, Validators.email]); 
      this.title = new FormControl(this.faculty.title);
      this.dept = new FormControl(this.faculty.dept);
      this.office = new FormControl(this.faculty.office);
      this.phone = new FormControl(this.faculty.phone);
      this.about = new FormControl(this.faculty.about_Me);
      this.research = new FormControl(this.faculty.research_Interest);
      this.link1 = new FormControl(this.faculty.link1);
      this.link2 = new FormControl(this.faculty.link2);
      this.link3 = new FormControl(this.faculty.link3);
    });
  }
 
  openFile() {
    document.querySelector('input')?.click();
  }

  handlePicture(fileList: any){
    this.uploadError = false;
    if (fileList.length === 0) {
      return;
    }
    this.serviceDispatcher.uploadFacultyPicture(fileList, this.psuID).subscribe({
      next: (event) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    },
    error: (err: HttpErrorResponse) => {
      console.log(err)
      this.message = 'Error in upload!';
      this.uploadError = true;
    }
  });

  this.shouldRefresh = !this.shouldRefresh;
  }

  goToProfileViewPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID,
        "facultyPSUID" : this.psuID
        
      }
    };


      //console.log(this.dept.value);
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



  if(!this.validate()){
  this.serviceDispatcher.editFacultyProfile(fd).subscribe(response => { });

  setTimeout(()=>{
    this.router.navigate(['/view-faculty-profile'], navigationExtras);
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
