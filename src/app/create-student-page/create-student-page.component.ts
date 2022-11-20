import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-student-page',
  templateUrl: './create-student-page.component.html',
  styleUrls: ['./create-student-page.component.css']
})
export class CreateStudentPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  engineeringItems: string[] = [ "Electrical and Computer Engineering Technology", "Chemical Engineering", "Electrical", "Mechanical", "Software", "Computer Science", "Industrial", "Interdisciplinary Business with Engineering Studies"];
  visualArtsItems: string[] = [ "Graph Design", "3D Modeling"];
  toggle = [false];

  goToStudentHomePage() {
    this.router.navigate(['/student-home']);
  }
}
