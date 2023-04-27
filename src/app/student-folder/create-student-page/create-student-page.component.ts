import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ParseService } from 'src/app/parse.service';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import {createReadStream} from 'fs'
import { AuthService } from 'src/app/Inbox/auth.service';

//For inbox stuff
interface AccountCreate {
  username: string;
  password: string;
  passwordConfirmation: string;
}

@Component({
  selector: 'app-create-student-page',
  templateUrl: './create-student-page.component.html',
  styleUrls: ['./create-student-page.component.css']
})
export class CreateStudentPageComponent implements OnInit {
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
  gpa = new FormControl('', [Validators.required, Validators.pattern('\\-?\\d*\\.?\\d{1,2}')]);
  major = new FormControl('', [Validators.required]);
  minor = new FormControl('');
  doubleMajor = new FormControl('');
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
  incentive = new FormControl('', [Validators.required]);
  psuID: string;
  fileName = '';
  pfp: any;
  result: any;
  filePath: any;
  imgPath: any;
  imgPath2: any;
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  uploadError = false;
  studentProfilePicPath = "";

  constructor(private authService: AuthService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute, private fb: FormBuilder, public parseService: ParseService, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });

    this.studentForm = this.fb.group({
      paid: this.paid,
      nonpaid: this.nonpaid,
      credit: this.credit,
    });

    this.studentForm.setErrors({required: true});
    
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

    this.studentForm.valueChanges.subscribe(newValue => {
    if (newValue.paid === true || newValue.nonpaid === true || newValue.credit === true) {
      this.studentForm.setErrors(null);
    } else {
      this.studentForm.setErrors({required: true});
    }
    });
    // this.studentForm = this.fb.group({
    //   skills: this.fb.array([
    //     this.addSkillFormGroup()
    //   ])
    // })
  }

  engineeringItems: string[] = [ "Computer", "Chemical", "Electrical", "Mechanical", "Software"];
  humanitiesSocialScienceItems: string[] = [ "Communication", "English", "Psychology", "Politcal Science", "History", "Digital Media"];
  businessItems: string[] = [ "Accounting", "Economics", "Finance", "Marketing"];
  scienceItems: string[]  = ["Biology", "Chemistry", "Environmental Science", "Physics", "Mathematics"]
  nursingItems: string[] = ["Nursing"]

  openFile() {
    document.querySelector('input')?.click();
  }

  addSkillFormGroup():FormGroup{
    return this.fb.group({
      skillSet: [''],
      skillSetLevel: ['']
    })
  }

  handle(e: any){
   let target = e.target
   let selectedFile = target.files[0];
   let fileType = selectedFile.type.split('/')[0]
   if(fileType != 'application'){
    if(fileType!='text'){
      alert("File type must be pdf, doc, or txt.")
      return;
    }
   }

   this.result = this.parseResume(selectedFile);
  }
  parseResume(selectedfile: any){
    const {AffindaCredential, AffindaAPI} = require("@affinda/affinda");
    const fs = require("fs");
    
    console.log(selectedfile);
    let fileReader = new FileReader();
    fileReader.readAsDataURL(selectedfile);
    fileReader.onload=()=>{
     let fileresult = fileReader.result;
     this.filePath = fileresult;
    
    }
    const credential = new AffindaCredential("fbbf9b7adef358bace64bba12937759c468db3a6")
    const client = new AffindaAPI(credential)
   
   
    client.createResume({file:selectedfile}).then((result: any) => {
    console.log("Returned data:");
    console.dir(result)
    var json = JSON.parse(JSON.stringify(result));
    //this.studentForm.get('firstName')?.setValue(json["first"]);
    let rfirstname = json.data.name.first;
    let rlastname = json.data.name.last;
    let remail = json.data.emails[0];

    this.firstName = new FormControl(rfirstname);
    this.lastName = new FormControl(rlastname);
    this.email = new FormControl(remail);
      for(var key in json.data.skills){
        console.log( json.data.skills[key].name)
        this.addResumeSkillField(json.data.skills[key].name)
        
      }
      this.removeSkillField(0)
    console.log(json.data.skills[0].name)
}).catch((err: any) => {
    console.log("An error occurred:");
    console.error(err); 
}); 
   /* client.createResume({url:  "https://api.affinda.com/static/sample_resumes/example.pdf"}).then((result: any) => {
        console.log("Returned data:");
        console.dir(result)
        var json = JSON.parse(JSON.stringify(result));
        //this.studentForm.get('firstName')?.setValue(json["first"]);
        console.log(json.data.profession);
        console.log(json.data.name.first);
        console.log(json.data.emails[0]);
        let rfirstname = json.data.name.first;
        let rlastname = json.data.name.last;
        let remail = json.data.emails[0];

        this.firstName = new FormControl(rfirstname);
        this.lastName = new FormControl(rlastname);
        this.email = new FormControl(remail);
       
        return result;
        
    }).catch((err: any) => {
        console.log("An error occurred:");
        console.error(err);
    }); */
    
    }
    
    handlePicture(fileList: any){
      this.uploadError = false;
      if(fileList[0].type.includes("image")) {
        if (fileList.length === 0) {
          return;
        }
        this.serviceDispatcher.uploadStudentPictureForPath(fileList).subscribe(response =>{
          this.studentProfilePicPath = response;
          this.progress = 100;
          this.message = "Upload success."
        });
      } else {
        alert("You must upload an image file (.jpg, .png, etc.).")
        return;
      }
    }
   
   onFileSelected(event: any){
    
    let targetImg = event.target
    let selectedImg = targetImg.files[0]
    let type = selectedImg.type.split('/')[0]
   // if(type!='image'){
    //  alert('Please select image')
    //  return;
  //  }
    let fileReader3 = new FileReader();
    fileReader3.readAsDataURL(selectedImg);
    fileReader3.onload=(event)=>{
    console.log(fileReader3.result);
     let imgresult = fileReader3.result;
     this.imgPath2 = imgresult;
     console.log(selectedImg.name); 
     this.result = this.parseResume(selectedImg); 
    }
    fileReader3.readAsText(selectedImg)
   }
   


  uploadResume(){
  
  }


  goToStudentHomePage() {
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
    sd.major2 = this.doubleMajor.value!;
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
    sd.profile_url = this.studentProfilePicPath;


    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    
    if(!this.validate()){
      
      this.serviceDispatcher.createStudentProfile(sd).subscribe(response => { }); // comment out, else profile will save to database 
      setTimeout(()=>{
        this.router.navigate(['/student-home'], navigationExtras);
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

  addResumeSkillField(skillName: string) {
    this.skillForm.push({
      skill: skillName,
      skillLevel: ''
    });
  }

}
