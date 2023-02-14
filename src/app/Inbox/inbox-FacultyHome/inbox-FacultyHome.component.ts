import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inbox-FacultyHome',
  templateUrl: './inbox-FacultyHome.component.html',
  styleUrls: ['./inbox-FacultyHome.component.css']
})
export class InboxHomeComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }


}
