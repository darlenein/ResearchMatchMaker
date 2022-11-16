import { Component, OnInit, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-faculty-page',
  templateUrl: './create-faculty-page.component.html',
  styleUrls: ['./create-faculty-page.component.css']
})
export class CreateFacultyPageComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

}

engineeringItems: string[] = [ "Electrical and Computer Engineering Technology", "Chemical Engineering", "Electrical", "Mechanical", "Software", "Computer Science", "Industrial", "Interdisciplinary Business with Engineering Studies"];
visualArtsItems: string[] = [ "Graph Design", "3D Modeling"];
toggle = [false];
}
