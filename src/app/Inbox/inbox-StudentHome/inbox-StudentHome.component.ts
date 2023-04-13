import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inbox-StudentHome',
  templateUrl: './inbox-StudentHome.component.html',
  styleUrls: ['./inbox-StudentHome.component.css']
})
export class StudentHomeComponent implements OnInit {
  psuID: string;
  userName: string;

  constructor(private route: ActivatedRoute) {
   }

  ngOnInit(): void {
  }

}
