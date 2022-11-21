import { Component, OnInit, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-faculty-page',
  templateUrl: './create-faculty-page.component.html',
  styleUrls: ['./create-faculty-page.component.css']
})
export class CreateFacultyPageComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {

}


goToFacultyHomePage() {
  this.router.navigate(['/faculty-home']);
}

}
