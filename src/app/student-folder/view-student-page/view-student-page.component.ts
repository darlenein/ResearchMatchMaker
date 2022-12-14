import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
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

  constructor(public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
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
