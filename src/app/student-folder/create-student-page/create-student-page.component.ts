import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-create-student-page',
  templateUrl: './create-student-page.component.html',
  styleUrls: ['./create-student-page.component.css']
})
export class CreateStudentPageComponent implements OnInit {
  firstName = new FormControl('');
  lastName = new FormControl('');
  email = new FormControl('');
  phone = new FormControl(''); // dont need?
  gpa = new FormControl('');
  major = new FormControl('');
  minor = new FormControl('');
  location = new FormControl('');
  gradMonth = new FormControl('');
  gradYear = new FormControl('');
  skills = new FormControl('');
  link1 = new FormControl('');
  link2 = new FormControl('');
  link3 = new FormControl('');
  paid = new FormControl('');
  nonpaid = new FormControl('');
  credit = new FormControl('');
  
  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
  }

  engineeringItems: string[] = [ "Computer", "Chemical", "Electrical", "Mechanical", "Software"];
  humanitiesSocialScienceItems: string[] = [ "Communication", "English", "Psychology", "Politcal Science", "History", "Digital Media"];
  businessItems: string[] = [ "Accounting", "Economics", "Finance", "Marketing"];
  scienceItems: string[]  = ["Biology", "Chemistry", "Environmental Science", "Physics", "Mathematics"]
  nursingItems: string[] = ["Nursing"]
  

  goToStudentHomePage() {
    //console.log(this.location.value);
    let sd = new StudentModel();
    sd.firstName = this.firstName.value!;
    sd.lastName = this.lastName.value!;
    sd.email = this.email.value!;
    sd.gpa = Number(this.gpa.value!);
    sd.major = this.major.value!;
    sd.minor = this.minor.value!;
    sd.graduationMonth = this.gradMonth.value!;
    sd.graduationYear = this.gradYear.value!;
    sd.locationPref = this.location.value!;
    sd.skills = this.skills.value!;
    sd.link1 = this.link1.value!;
    sd.link2 = this.link2.value!;
    sd.link3 = this.link3.value!;
    sd.preferPaid = JSON.parse(this.paid.value!);
    sd.perferNonpaid = JSON.parse(this.nonpaid.value!);
    sd.preferCredit = JSON.parse(this.credit.value!);
    //this.serviceDispatcher.createStudentProfile(sd);
    //this.router.navigate(['/student-home']);
  }

  createStudentProfile(student : StudentModel){
    //this.serviceDispatcher.createStudentProfile(student);
  }


}
