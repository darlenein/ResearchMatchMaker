import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { FacultyModel } from 'src/app/models/faculty.model';
import { StudentModel } from 'src/app/models/student.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() inputType: string;
  @Input() controlType = 'input';
  studentList: StudentModel[];
  facultyList: FacultyModel[];
  options: StudentModel[];

  //options: String[] = ['One', 'Two', 'Three'];
  //options: String[];
  filteredOptions: Observable<String[]>;
  temp: String;

  filteredStudents: StudentModel[];
  filteredFaculty: FacultyModel[];

  constructor(public serviceDispatcher: ServiceDispatcher) {
   }

  ngOnInit(): void {
    this.serviceDispatcher.getAllStudents().subscribe(response => {
      this.studentList = response;
      this.splitStudentsInformationBySemicolon(this.studentList);
      this.filteredStudents = this.studentList;
    });

    this.serviceDispatcher.getAllFaculty().subscribe(response => {
      this.facultyList = response;
      this.splitInformationBySemicolon(this.facultyList);
      this.filteredFaculty = this.facultyList;
    });

  }

  displayFn(s: StudentModel){
    //return s.first_Name;
    return s && s.name ? s.name : '';

  }

  

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  //new 
  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  splitStudentsInformationBySemicolon(studentArray: StudentModel[]) {
    studentArray.forEach(student => {
      student.splitSkills = this.separateBySemicolon(student.skills);
    });
  }

  splitInformationBySemicolon(facultyArray: FacultyModel[]) {
    facultyArray.forEach(faculty => {
      faculty.splitAbout = this.SeparateBySemicolon(faculty.about_Me);
      faculty.splitResearchInterest = this.separateBySemicolon(faculty.research_Interest);
    });
  }

  SeparateBySemicolon(rawText: String) {
    let text: string[] = [];
    if(rawText){
      text = rawText.split(';');
    }
    return text;
  }
}
