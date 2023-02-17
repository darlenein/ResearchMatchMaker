import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-student-profile-page',
  templateUrl: './edit-student-profile-page.component.html',
  styleUrls: ['./edit-student-profile-page.component.css']
})
export class EditStudentProfilePageComponent implements OnInit {
  
  skillForm = [
    {
      skill: '',
      skillLevel: ''
    }
  ];

  studentForm: FormGroup = new FormGroup('');
  firstName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z -]*")]);
  lastName = new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z -]*")]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl(''); // dont need?
  gpa = new FormControl('', [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]);
  major = new FormControl('', [Validators.required]);
  minor = new FormControl('');
  location = new FormControl('', [Validators.required]);
  gradMonth = new FormControl('');
  gradYear = new FormControl('');
  skillSet = new FormControl('');
  skillSetLevel = new FormControl('');
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
  student: any;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute,private fb: FormBuilder) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];

      this.studentForm = this.fb.group({
        paid: this.paid,
        nonpaid: this.nonpaid,
        credit: this.credit,
      });
  
      this.studentForm.setErrors({required: true});
    });
  }

  ngOnInit(): void {
    this.serviceDispatcher.getStudent(this.psuID).subscribe(response => {
      this.student = response
      this.firstName = new FormControl(this.student.first_Name);
      this.lastName = new FormControl(this.student.last_Name);
      this.email = new FormControl(this.student.email); 
      this.gpa = new FormControl(this.student.gpa);
      this.major = new FormControl(this.student.major);
      this.minor = new FormControl(this.student.minor);
      this.location = new FormControl(this.student.location);
      this.gradMonth = new FormControl(this.student.graduation_Month);
      this.gradYear = new FormControl(this.student.graduation_Year);
      this.skillSet = new FormControl(this.student.skillString);
      this.skillSetLevel = new FormControl(this.student.skillLevelString);
      this.link1 = new FormControl(this.student.link1);
      this.link2 = new FormControl(this.student.link2);
      this.link3 = new FormControl(this.student.link3);
      this.paid = new FormControl(this.student.preferPaid);
      this.nonpaid = new FormControl(this.student.preferNonpaid);
      this.credit = new FormControl(this.student.preferCredit);
      this.interest = new FormControl(this.student.research_Interest);
      this.projects = new FormControl(this.student.research_Project);
    });

    this.studentForm.valueChanges.subscribe(newValue => {
      if (newValue.paid === true || newValue.nonpaid === true || newValue.credit === true) {
        this.studentForm.setErrors(null);
      } else {
        this.studentForm.setErrors({required: true});
      }
      });
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
    let skillString = "";
    let skillLevelString = "";

    this.skillForm.forEach(element => {
      skillString = skillString.concat(element.skill + "; ");
      skillLevelString = skillLevelString.concat(element.skillLevel + "; ");
    });
    sd.student_Id = this.psuID;
    sd.first_Name = this.firstName.value!;
    sd.last_Name = this.lastName.value!;
    sd.email = this.email.value!;
    sd.gpa = Number(this.gpa.value!);
    sd.major = this.major.value!;
    sd.minor = this.minor.value!;
    sd.graduation_Month = this.gradMonth.value!;
    sd.graduation_Year = this.gradYear.value!;
    sd.preferLocation = this.location.value!;
    sd.skills = skillString;
    sd.skillLevel = skillLevelString;
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
    sd.research_Interest = this.interest.value!;
    sd.research_Project = this.projects.value!;
    

    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    if(!this.validate()){
    //this.serviceDispatcher.editStudentProfile(sd).subscribe(response => { });
    this.router.navigate(['/view-student-profile'], navigationExtras);
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

  if (this.gpa.invalid) {
    this.gpa.markAsDirty();
    hasError = true;
  }

  if (this.major.invalid) {
    this.major.markAsDirty();
    hasError = true;
  }

  if (this.location.invalid) {
    this.location.markAsDirty();
    hasError = true;
  }

  if (this.paid.value || this.nonpaid.value || this.credit.value) {
    this.studentForm.setErrors(null);
  } else {
    this.studentForm.setErrors({required: true});
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

getGPAErrorMessage() {
  if (this.gpa.hasError('required')) {
    return 'You must enter a GPA';
  }
  return this.gpa.hasError('pattern') ? 'Not a valid GPA' : '';
}

getMajorErrorMessage() {
  if (this.major.hasError('required')) {
    return 'You must enter a Major';
  }
  return '';
}

getLocationErrorMessage() {
  if (this.location.hasError('required')) {
    return 'You must enter a Preferred Research Location';
  }
  return '';
}

getPaidErrorMessage() {
  if (this.studentForm.invalid) {
    return 'You must enter a Preferred Research Incentive';
  }
  return '';
}

// dynamically add more skills 
addSkillField() {
  this.skillForm.push({
    skill: '',
    skillLevel: ''
  });
}

removeSkillField(index: number) {
  this.skillForm.splice(index,1);
}

}