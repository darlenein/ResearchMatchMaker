import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-research-page',
  templateUrl: './add-research-page.component.html',
  styleUrls: ['./add-research-page.component.css']
})
export class AddResearchPageComponent implements OnInit {

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