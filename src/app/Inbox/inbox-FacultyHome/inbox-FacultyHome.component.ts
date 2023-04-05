import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-inbox-FacultyHome',
  templateUrl: './inbox-FacultyHome.component.html',
  styleUrls: ['./inbox-FacultyHome.component.css']
})
export class InboxHomeComponent implements OnInit {
  psuID: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
   }

  ngOnInit(): void {
  }


}
