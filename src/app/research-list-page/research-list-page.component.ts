import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceDispatcher } from '../ServiceDispatcher';

@Component({
  selector: 'app-research-list-page',
  templateUrl: './research-list-page.component.html',
  styleUrls: ['./research-list-page.component.css']
})
export class ResearchListPageComponent implements OnInit {

  research: any; 

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher) { }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response
    });
  }

  separateByComma(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

}
