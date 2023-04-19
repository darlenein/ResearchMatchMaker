import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StudentModel } from 'src/app/models/student.model';
import { FacultyModel } from 'src/app/models/faculty.model';
import { ServiceDispatcher } from 'src/app/ServiceDispatcher';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  studentList: StudentModel[];
  facultyList: FacultyModel[];
  emailForm: FormGroup;
  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter();

  selected = ''
  psuID: string;

  constructor(private route: ActivatedRoute, public serviceDispatcher: ServiceDispatcher) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getAllFaculty().subscribe(response => {
      this.facultyList = response;
    });

    this.serviceDispatcher.getAllStudents().subscribe(response => {
      this.studentList = response;
    });

    const {subject, from, to = this.selected, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required])
    });
  }

  onSubmit() {
    this.emailSubmit.emit(this.emailForm.value);
  }

  onSelected(value:string): void {
    this.selected = value;
  }

}
