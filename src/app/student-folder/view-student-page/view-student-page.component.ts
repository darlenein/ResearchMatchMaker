import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-view-student-page',
  templateUrl: './view-student-page.component.html',
  styleUrls: ['./view-student-page.component.css']
})
export class ViewStudentPageComponent implements OnInit {

  student: any; 
  splitSkills: any;
  splitResearchInterest: any;
  psuID: string;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
    // this.serviceDispatcher.getStudent(this.psuID).subscribe(response => {
    //   this.student = response
    //   this.splitSkills = this.separateBySemicolon(this.student.skills);
    //   this.splitResearchInterest = this.separateBySemicolon(this.student.researchInterest);
    // });

    this.serviceDispatcher.getStudent('dxi5017').subscribe(response => {
      this.student = response
      this.splitSkills = this.separateBySemicolon(this.student.skills);
      this.splitResearchInterest = this.separateBySemicolon(this.student.researchInterest);
    });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }


}
