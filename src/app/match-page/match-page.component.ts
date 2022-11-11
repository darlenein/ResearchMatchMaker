import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  engineeringItems: string[] = [ "Civil", "Chemical", "Electrical", "Mechanical"];
  visualArtsItems: string[] = [ "Graph Design", "3D Modeling"];
  toggle = [false];
}
