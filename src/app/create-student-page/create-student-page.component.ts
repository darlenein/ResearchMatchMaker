import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-student-page',
  templateUrl: './create-student-page.component.html',
  styleUrls: ['./create-student-page.component.css']
})
export class CreateStudentPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  engineeringItems: string[] = [ "Electrical and Computer Engineering Technology", "Chemical Engineering", "Electrical", "Mechanical", "Software", "Computer Science", "Industrial", "Interdisciplinary Business with Engineering Studies"];
  visualArtsItems: string[] = [ "Graph Design", "3D Modeling"];
  toggle = [false];
}
