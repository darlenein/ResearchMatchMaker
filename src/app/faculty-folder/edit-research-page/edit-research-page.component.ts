import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/department.model';
import { ResearchModel } from 'src/app/models/research.model';
import { SubDepartmentModel } from 'src/app/models/subdepartment.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-edit-research-page',
  templateUrl: './edit-research-page.component.html',
  styleUrls: ['./edit-research-page.component.css']
})
export class EditResearchPageComponent implements OnInit {
  requiredSkillList = [
    {
      skill: '',
      skillLevel: ''
    }
  ];
  encouragedSkillList = [
    {
      skill: '',
      skillLevel: ''
    }
  ];

  researchForm : FormGroup;
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  location = new FormControl('', [Validators.required]);
  rskills = new FormControl('', [Validators.required]);
  eskills = new FormControl('', [Validators.required]);
  address = new FormControl('');
  startDate = new FormControl('', [Validators.required]);
  endDate = new FormControl('', [Validators.required]);
  active = new FormControl('', [Validators.required]);
  credit = new FormControl('');
  paid = new FormControl('');
  nonpaid = new FormControl('');
  engineeringValue = new FormControl('');
  humanitiesValue = new FormControl('');
  politicalValue = new FormControl('');
  scienceValue = new FormControl('');
  nursingValue = new FormControl('');
  businessValue = new FormControl('');
  research: any;
  researchID: number;
  psuID: string;
  researchDeptList: string[];
  departments: DepartmentModel[];
  toggle = [false];
  engineeringItems: any[];
  politicalScienceItems: any[];
  humanitiesSocialScienceItems: any[];
  businessItems: any[];
  scienceItems: any[];
  nursingItems: any[];
  sepReqSkills: string[]
  sepEncSkills: string[]
  sepReqSkillLevel: string[]
  sepEncSkillLevel: string[]
  sdate: any
  hasSubmitted = false;
  researchDepts: any;

  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
     
      this.researchID = params["researchID"];

    });
    this.researchForm = this.fb.group({
      paid: this.paid,
      nonpaid: this.nonpaid,
      credit: this.credit,
    });

    this.researchForm.setErrors({required: true});

    this.researchDeptList = [];

   }

  ngOnInit(): void {
    this.serviceDispatcher.getResearchByID(this.researchID).subscribe(response => {

      this.research = response
      //this.active = this.research.active ? new FormControl("active") : new FormControl("non-active");
      this.research.active ? this.active.setValue("active") : this.active.setValue("non-active");
      this.name.setValue(this.research.name);
      this.description.setValue(this.research.description);
      this.location.setValue(this.research.location);
      this.rskills.setValue(this.research.required_Skills);
      this.eskills.setValue(this.research.encouraged_Skills);
      this.address.setValue(this.research.address);
      this.startDate.setValue(this.formatDate(this.research.start_Date));
      this.endDate.setValue(this.formatDate(this.research.end_Date));
      this.credit.setValue(this.research.isCredit);
      this.paid.setValue(this.research.isPaid);
      this.nonpaid.setValue(this.research.isNonpaid);
      
      this.psuID = this.research.faculty_Id;
      this.sepReqSkills = this.research.required_Skills.split(';');
      this.sepReqSkillLevel = this.research.requiredSkillLevel ? this.research.requiredSkillLevel.split(';') : null;
      this.sepEncSkills = this.research.encouraged_Skills.split(';');
      this.sepEncSkillLevel = this.research.requiredSkillLevel ? this.research.encouragedSkillLevel.split(';') : null;

      this.serviceDispatcher.getAllSubdeptByResearchId(this.researchID).subscribe(response => {
        this.researchDepts = response;
      });

      for(var key1 in this.sepReqSkills){
        if(this.sepReqSkillLevel)
        {
          this.sepReqSkillLevel[key1] = this.sepReqSkillLevel[key1].trim();
          this.addExistingReqSkillField(this.sepReqSkills[key1], this.sepReqSkillLevel[key1])
        } else {
          this.addExistingReqSkillField(this.sepReqSkills[key1], "")
        } 
       }
       this.removeRequiredSkillField(0)

       for(var key in this.sepEncSkills){
        if(this.sepEncSkillLevel) {
          this.addExistingEncSkillField(this.sepEncSkills[key], this.sepEncSkillLevel[key])
        } else {
          this.addExistingEncSkillField(this.sepEncSkills[key], "")
        }
      }
      this.removeEncouragedSkillField(0);
      this.setMinDate(this.active);
   });
  
 
    this.serviceDispatcher.getAllDepartments().subscribe(response => { 
      this.departments = response;
      this.engineeringItems = this.getSubDepts(this.departments[0].department_id);
      //this.politicalScienceItems = this.getSubDepts(this.departments[1].department_id);
      this.businessItems = this.getSubDepts(this.departments[1].department_id);
      this.humanitiesSocialScienceItems = this.getSubDepts(this.departments[2].department_id);

      this.scienceItems = this.getSubDepts(this.departments[3].department_id);
      this.nursingItems = this.getSubDepts(this.departments[4].department_id);
    });

    this.researchForm.valueChanges.subscribe(newValue => {
      if (newValue.paid === true || newValue.nonpaid === true || newValue.credit === true) {
        this.researchForm.setErrors(null);
      } else {
        this.researchForm.setErrors({required: true});
      }
      });
  }

  getSubDepts(id:number): any{
    let subdepartments: any[] = [];
      this.serviceDispatcher.getAllSubdeptByDeptId(id).subscribe(items => {
        items.map((item: any) => {
          subdepartments.push(item);
        });
      });
      return subdepartments;
    }
  
  goToFacultyManageResearch() {  
    this.hasSubmitted = true;
    let navigationExtras: NavigationExtras = {
    queryParams: {
      "psuID": this.psuID
    }
  };

  debugger;
    this.researchDeptList = [...this.engineeringValue.value!, ...this.politicalValue.value!, ...this.businessValue.value!, 
      ...this.humanitiesValue.value!, ...this.scienceValue.value!, ...this.nursingValue.value!];
  
      let rSkillString = "";
      let rSkillLevelString = "";
      let eSkillString = "";
      let eSkillLevelString = "";
    
      this.requiredSkillList.forEach(element => {
          rSkillString = rSkillString.concat(element.skill + " ;");
          rSkillLevelString = rSkillLevelString.concat(element.skillLevel + " ;");
      });
    
      this.encouragedSkillList.forEach(element => {
        eSkillString = eSkillString.concat(element.skill + " ;");
        eSkillLevelString = eSkillLevelString.concat(element.skillLevel + " ;");
      });

    let rm = new ResearchModel();
    rm.research_Id = Number(this.researchID);
    rm.researchDepts = this.researchDeptList;
    rm.faculty_Id = this.psuID;
    rm.name = this.name.value!;
    rm.description = this.description.value!;
    rm.location = this.location.value!;
    rm.required_Skills = this.rskills.value!;
    rm.encouraged_Skills = this.eskills.value!;
    rm.start_Date = this.startDate.value!;
    rm.end_Date = this.endDate.value!;
    rm.requiredSkillLevel = rSkillLevelString;
    rm.encouragedSkillLevel = eSkillLevelString
    
    if (this.active.value === "active") {
      rm.active = true;
    }
    
    else rm.active = false;
    rm.address = this.address.value!;
    if (this.paid.value) {
      rm.isPaid = true;
    }
    else rm.isPaid = false;
    if (this.nonpaid.value) {
      rm.isNonpaid = true;
    }
    else rm.isNonpaid = false;
    if (this.credit.value) {
      rm.isCredit = true;
    }
    else rm.isCredit = false;
    if(!this.validate()){
      debugger;
    this.serviceDispatcher.editResearch(rm).subscribe(response => { });
    this.router.navigate(['/faculty-research'], navigationExtras);
  }
}
  validate(): any {
    let hasError = false;
  
    if (this.active.invalid) {
      this.active.markAsDirty();
      hasError = true;
    }
  
    if (this.name.invalid) {
      this.name.markAsDirty();
      hasError = true;
    }
  
    if (this.researchDeptList.length === 0) {
      this.engineeringValue.markAsDirty();
      this.humanitiesValue.markAsDirty();
      this.politicalValue.markAsDirty();
      this.scienceValue.markAsDirty();
      this.nursingValue.markAsDirty();
      this.businessValue.markAsDirty();
      hasError = true;
    }
  
    if (this.location.invalid) {
      this.location.markAsDirty();
      hasError = true;
    }
  
    if (this.description.invalid) {
      this.description.markAsDirty();
      hasError = true;
    }
  
    if (this.location.invalid) {
      this.location.markAsDirty();
      hasError = true;
    }
  
    if (this.rskills.invalid) {
      this.rskills.markAsDirty();
      hasError = true;
    }
  
    if (this.eskills.invalid) {
      this.eskills.markAsDirty();
      hasError = true;
    }
  
    if (this.paid.value || this.nonpaid.value || this.credit.value) {
      this.researchForm.setErrors(null);
    } else {
      this.researchForm.setErrors({required: true});
      hasError = true;
    }
    return hasError;
  }
  
  //----------------- validation error msgs -------------------------------
  getSelectAtLeastOneError() {
    if (this.active.hasError('required') || this.location.hasError('required') || 
     (this.engineeringValue.hasError('required') && this.humanitiesValue.hasError('required') && this.politicalValue.hasError('required') 
     && this.scienceValue.hasError('required') && this.nursingValue.hasError('required') && this.businessValue.hasError('required'))) {
      return 'You must select one of the options';
    }
    return '';
  }
  
  getEmptyFieldError() {
    if (this.description.hasError('required') || this.rskills.hasError('required') || this.eskills.hasError('required')) {
      return "Enter 'n/a' or 'none' if not available";
    }
    return '';
  }
  
  getResearchNameError() {
    if (this.name.hasError('required')) {
      return 'You must enter a Research Name';
    }
    return '';
  }
  
  getPaidErrorMessage() {
    if (this.researchForm.invalid) {
      return 'You must enter a Research Incentive';
    }
    return '';
  }

  getStartDateError() {
    if (this.startDate.hasError('required')) {
      return 'You must enter a valid start date';
    }
    return '';
  }
  
  getEndDateError() {
    if (this.endDate.hasError('required')) {
      return 'You must enter a valid end date';
    }
    return '';
  }
  
  //----------------- end validation error msgs -------------------------------
  
  //---------------- functions to add and remove skills on HTML end-----------------------
  addEncouragedSkillField() {
    this.encouragedSkillList.push({
      skill: '',
      skillLevel: ''
    });
  }
  
  addRequiredSkillField() {
    this.requiredSkillList.push({
      skill: '',
      skillLevel: ''
    });
  }
  
  removeEncouragedSkillField(index: number) {
    this.encouragedSkillList.splice(index,1);
  }
  
  removeRequiredSkillField(index: number) {
    this.requiredSkillList.splice(index,1);
  }
  addExistingReqSkillField(existingReqSkills:string, existingReqSkillLevel:string) {
      this.requiredSkillList.push({
        skill: existingReqSkills,
        skillLevel: existingReqSkillLevel
      });
  }

  addExistingEncSkillField(existingEncSkills:string, existingEncSkillLevel:string) {
      this.encouragedSkillList.push({
        skill: existingEncSkills,
        skillLevel: existingEncSkillLevel
      });  
  }

  getCurrentDayAsString() : string
{
  let today = new Date();
  let yyyy = today.getFullYear();
  let stringMM;
  let stringDD;

  if(today.getDate() < 10)
  {
    stringDD = '0' + today.getDate();
  } else
  {
    stringDD = today.getDate(); 
  }

  if((today.getMonth() + 1) < 10)
  {
    stringMM = '0' + (today.getMonth() + 1);
  }
  else {
    stringMM = today.getMonth() + 1
  }
  let minDate = yyyy + '-' + stringMM + '-' + stringDD;
  return minDate;
}

setMinDate(event :any) {
  if(event.value == "active")
  {
    let minDate = this.getCurrentDayAsString();
    let startDateElement = document.getElementById("start date");
    let endDateElement = document.getElementById("end date");
    startDateElement?.setAttribute("min", minDate);
    endDateElement?.setAttribute("min", minDate);
  } else {
    let startDateElement = document.getElementById("start date");
    let endDateElement = document.getElementById("end date");
    startDateElement?.setAttribute("min", "");
    endDateElement?.setAttribute("min", "");
  }
 }

 checkedSelected(deptName : string) : boolean {
  if(this.researchDepts) {
    if(this.researchDepts.includes(deptName)) {
      return true;
    }
  }
  return false;
 }

 formatDate(date: string): string {
  let dateToFormat = new Date(date);
  let yyyy = dateToFormat.getFullYear();
  let stringMM;
  let stringDD;

  if(dateToFormat.getDate() < 10)
  {
    stringDD = '0' + dateToFormat.getDate();
  } else
  {
    stringDD = dateToFormat.getDate(); 
  }

  if((dateToFormat.getMonth() + 1) < 10)
  {
    stringMM = '0' + (dateToFormat.getMonth() + 1);
  }
  else {
    stringMM = dateToFormat.getMonth() + 1
  }
  let formattedDate = yyyy + '-' + stringMM + '-' + stringDD;
  return formattedDate;
 }
}


