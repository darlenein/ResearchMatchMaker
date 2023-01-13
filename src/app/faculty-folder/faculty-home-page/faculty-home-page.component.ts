import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-faculty-home-page',
  templateUrl: './faculty-home-page.component.html',
  styleUrls: ['./faculty-home-page.component.css']
})
export class FacultyHomePageComponent implements OnInit {
  psuID: string;
  
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });
  }

  ngOnInit(): void {
  }

}
