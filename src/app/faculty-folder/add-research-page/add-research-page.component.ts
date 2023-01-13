import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchModel } from 'src/app/models/research.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-add-research-page',
  templateUrl: './add-research-page.component.html',
  styleUrls: ['./add-research-page.component.css']
})
export class AddResearchPageComponent implements OnInit {
  name = new FormControl('');
  description = new FormControl('');
  location = new FormControl('');
  rskills = new FormControl('');
  eskills = new FormControl('');
  address = new FormControl('');
  startDate = new FormControl('');
  endDate = new FormControl('');
  active = new FormControl('');
  credit = new FormControl('');
  paid = new FormControl('');
  nonpaid = new FormControl('');
  engineeringValue = new FormControl('');
  humanitiesValue = new FormControl('');
  politicalValue = new FormControl('');
  scienceValue = new FormControl('');
  nursingValue = new FormControl('');
  businessValue = new FormControl('');

  psuID: string;
  researchDeptList: string[]

  constructor(public serviceDispatcher: ServiceDispatcher, private router: Router, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
  }
  engineeringItems: string[] = [ "Computer", "Chemical", "Electrical", "Mechanical", "Software"];
  politicalScienceItems: string[] = [ "Crime and Law", "International Relations", "Politics and Government", "Public Policy"];
  humanitiesSocialScienceItems: string[] = [ "Communication", "English", "Psychology", "Politcal Science", "History", "Digital Media"];
  businessItems: string[] = [ "Accounting", "Economics", "Finance", "Marketing"];
  scienceItems: string[]  = ["Biology", "Chemistry", "Environmental Science", "Physics", "Mathematics"]
  nursingItems: string[] = ["Nursing"]
  
  toggle = [false];


goToFacultyManageResearch() {
  this.researchDeptList = [...this.engineeringValue.value!, ...this.politicalValue.value!, ...this.businessValue.value!, 
    ...this.humanitiesValue.value!, ...this.scienceValue.value!, ...this.nursingValue.value!];

  let rm = new ResearchModel();
  rm.researchDepts = this.researchDeptList;
  rm.faculty_Id = this.psuID;
  rm.name = this.name.value!;
  rm.description = this.description.value!;
  rm.location = Number(this.location.value!);
  rm.required_skills = this.rskills.value!;
  rm.encouraged_Skills = this.eskills.value!;
  rm.start_Date = this.startDate.value!;
  rm.end_Date = this.endDate.value!;
  
  if (this.active.value === "active") {
    rm.active = true;
  }
  else rm.active = false;
  rm.address = this.address.value!;
  if (this.paid.value) {
    rm.isPaid = 1;
  }
  else rm.isPaid = 0;
  if (this.nonpaid.value) {
    rm.isNonpaid = 1;
  }
  else rm.isNonpaid = 0;
  if (this.credit.value) {
    rm.isCredit = 1;
  }
  else rm.isCredit = 0;
  //this.serviceDispatcher.createResearch(rm).subscribe(response => { });
  this.router.navigate(['/faculty-research']);
}

}