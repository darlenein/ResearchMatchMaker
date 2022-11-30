import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.css']
})
export class FacultyListComponent implements OnInit {

  faculty: FacultyModel[]; 
  splitAbout: any;
  splitResearchInterest: any;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
    this.serviceDispatcher.getAllFaculty().subscribe(response => {
      this.faculty = response
      this.splitInformationBySemicolon(this.faculty);
    });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  splitInformationBySemicolon(facultyArray: FacultyModel[]) {
    facultyArray.forEach(faculty => {
      faculty.splitAbout = this.separateBySemicolon(faculty.aboutMe);
      faculty.splitResearchInterest = this.separateBySemicolon(faculty.researchInterest);
    });
  }

  goToFacultyProfile() {
    this.router.navigate(['/view-faculty-page'])
  }

}
