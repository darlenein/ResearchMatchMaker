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
  engineeringValue = new FormControl('', [Validators.required]);
  humanitiesValue = new FormControl('', [Validators.required]);
  politicalValue = new FormControl('', [Validators.required]);
  scienceValue = new FormControl('', [Validators.required]);
  nursingValue = new FormControl('', [Validators.required]);
  businessValue = new FormControl('', [Validators.required]);
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
  validStartDate = true;
  validEndDate = true;
  hasSubmitted = false;

  
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
      //debugger;
      this.research = response
      this.name = new FormControl(this.research.name,[Validators.required]);
      this.description = new FormControl(this.research.description,[Validators.required]);
      this.location = new FormControl(this.research.location,[Validators.required]);
      this.rskills = new FormControl(this.research.required_Skills,[Validators.required]);
      this.eskills = new FormControl(this.research.encouraged_Skills,[Validators.required]);
      this.address = new FormControl(this.research.address);
      this.startDate = new FormControl(this.research.start_Date,[Validators.required]);
      this.endDate = new FormControl(this.research.end_Date,[Validators.required]);
      this.active = this.research.active ? new FormControl("active") : new FormControl("non-active");
      this.credit = new FormControl(this.research.isCredit);
      this.paid = new FormControl(this.research.isPaid);
      this.nonpaid = new FormControl(this.research.isNonpaid);
      this.engineeringValue = new FormControl('', [Validators.required]);
      this.humanitiesValue = new FormControl('', [Validators.required]);
      this.politicalValue = new FormControl('', [Validators.required]);
      this.scienceValue = new FormControl('', [Validators.required]);
      this.nursingValue = new FormControl('', [Validators.required]);
      this.businessValue = new FormControl('', [Validators.required]);
      this.psuID = this.research.faculty_Id;
      this.sepReqSkills = this.research.required_Skills.split(';');
      this.sepReqSkillLevel = this.research.requiredSkillLevel ? this.research.requiredSkillLevel.split(';') : null;
      this.sepEncSkills = this.research.encouraged_Skills.split(';');
      this.sepEncSkillLevel = this.research.requiredSkillLevel ? this.research.encouragedSkillLevel.split(';') : null;
     
      for(var key1 in this.sepReqSkills){
        if(this.sepReqSkillLevel)
        {
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
      this.removeEncouragedSkillField(0)
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
    let navigationExtras: NavigationExtras = {
    queryParams: {
      "psuID": this.psuID
    }
  };

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
    rm.research_Id = this.researchID;
    rm.researchDepts = this.researchDeptList;
    rm.faculty_Id = this.psuID;
    rm.name = this.name.value!;
    rm.description = this.description.value!;
    rm.location = this.location.value!;
    rm.required_Skills = this.rskills.value!;
    rm.encouraged_Skills = this.eskills.value!;
    rm.start_Date = this.startDate.value!;
    rm.end_Date = this.endDate.value!;
    
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

    if(!this.validStartDate || !this.validEndDate) {
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

  validateDate() {
    if(this.active.value == "active")
    {
      let startDate = new Date(this.startDate.value!);
      let endDate = new Date(this.endDate.value!);
      let currentDate = new Date(this.getCurrentDayAsString());
  
      if(startDate < currentDate) {
        this.validStartDate = false;
      } else {
        this.validStartDate = true;
      }
  
      if(endDate < currentDate) {
        this.validEndDate = false;
      } else {
        this.validEndDate = true;
      }
    } else {
      this.validStartDate = true;
      this.validEndDate = true;
    }
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
  this.validateDate();
 }



}


