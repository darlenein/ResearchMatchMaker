import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-edit-student-profile-page',
  templateUrl: './edit-student-profile-page.component.html',
  styleUrls: ['./edit-student-profile-page.component.css']
})
export class EditStudentProfilePageComponent implements OnInit {

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
  interest = new FormControl('');
  projects = new FormControl('');
  psuID: string;
  fileName = '';
  pfp: any;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute,) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
  }
  engineeringItems: string[] = [ "Computer", "Chemical", "Electrical", "Mechanical", "Software"];
  humanitiesSocialScienceItems: string[] = [ "Communication", "English", "Psychology", "Politcal Science", "History", "Digital Media"];
  businessItems: string[] = [ "Accounting", "Economics", "Finance", "Marketing"];
  scienceItems: string[]  = ["Biology", "Chemistry", "Environmental Science", "Physics", "Mathematics"]
  nursingItems: string[] = ["Nursing"]
  
  openFile() {
    document.querySelector('input')?.click();
  }

  handle(e: any){
    console.log (e.value);
    // need to upload image to somewhere then
    // need to save into database
  }

  goToProfileViewPage() {
    let sd = new StudentModel();
    sd.id = this.psuID;
    sd.firstName = this.firstName.value!;
    sd.lastName = this.lastName.value!;
    sd.email = this.email.value!;
    sd.gpa = Number(this.gpa.value!);
    sd.major = this.major.value!;
    sd.minor = this.minor.value!;
    sd.graduationMonth = this.gradMonth.value!;
    sd.graduationYear = this.gradYear.value!;
    sd.preferLocation = this.location.value!;
    sd.skills = this.skills.value!;
    sd.link1 = this.link1.value!;
    sd.link2 = this.link2.value!;
    sd.link3 = this.link3.value!;
    if (this.paid.value) {
      sd.preferPaid = true;
    }
    else {
      sd.preferPaid = false;
    }
    if (this.nonpaid.value) {
      sd.preferNonpaid = true;
    }
    else {
      sd.preferNonpaid = false;
    }
    if (this.credit.value) {
      sd.preferCredit = true;
    }
    else {
      sd.preferCredit = false;
    }
    sd.researchInterest = this.interest.value!;
    sd.researchProject = this.projects.value!;
    //this.serviceDispatcher.createStudentProfile(sd).subscribe(response => { });

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    
    this.router.navigate(['/view-student-profile'], navigationExtras);
  }
}
