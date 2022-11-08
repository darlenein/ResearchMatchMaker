import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDispatcher } from '../ServiceDispatcher';

@Component({
  selector: 'app-opportunity-board-page',
  templateUrl: './opportunity-board-page.component.html',
  styleUrls: ['./opportunity-board-page.component.css']
})
export class OpportunityBoardPageComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { 
  }

  ngOnInit(): void {
  }
}
