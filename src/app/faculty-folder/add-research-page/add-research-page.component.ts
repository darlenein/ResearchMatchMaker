import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  engineeringItems: string[] = [ "Computer", "Chemical", "Electrical", "Mechanical", "Software"];
  humanitiesSocialScienceItems: string[] = [ "Communication", "English", "Psychology", "Politcal Science", "History", "Digital Media"];
  businessItems: string[] = [ "Accounting", "Economics", "Finance", "Marketing"];
  scienceItems: string[]  = ["Biology", "Chemistry", "Environmental Science", "Physics", "Mathematics"]
  nursingItems: string[] = ["Nursing"]
  
  toggle = [false];


goToFacultyManageResearch() {
  this.router.navigate(['/faculty-research']);
}

}