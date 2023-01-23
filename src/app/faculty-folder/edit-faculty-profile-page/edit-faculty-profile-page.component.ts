import { Component, OnInit, Input, ViewChild, ElementRef  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-edit-faculty-profile-page',
  templateUrl: './edit-faculty-profile-page.component.html',
  styleUrls: ['./edit-faculty-profile-page.component.css']
})
export class EditFacultyProfilePageComponent implements OnInit {

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
  psuID: string;
  faculty: any;
  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getFaculty('nii1').subscribe(response => {
      this.faculty = response
      this.firstName = new FormControl(this.faculty.firstName);
      this.lastName = new FormControl(this.faculty.lastName);
      this.email = new FormControl(this.faculty.email); 
      this.title = new FormControl(this.faculty.title);
      this.dept = new FormControl(this.faculty.dept);
      this.office = new FormControl(this.faculty.office);
      this.phone = new FormControl(this.faculty.phone);
      this.about = new FormControl(this.faculty.aboutMe);
      this.research = new FormControl(this.faculty.researchInterest);
      this.link1 = new FormControl(this.faculty.link1);
      this.link2 = new FormControl(this.faculty.link2);
      this.link3 = new FormControl(this.faculty.link3);
    });
  }
 
  openFile() {
    document.querySelector('input')?.click();
  }

  handle(e: any){
    console.log (e.value);
    // need to upload image to somewhere then
    // need to save into database
  }

  goToProfileViewPage() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };


      //console.log(this.dept.value);
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
  this.router.navigate(['/view-faculty-profile'], navigationExtras);
}

}
