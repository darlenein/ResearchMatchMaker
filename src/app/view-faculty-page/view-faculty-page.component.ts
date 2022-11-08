import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-view-faculty-page',
  templateUrl: './view-faculty-page.component.html',
  styleUrls: ['./view-faculty-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewFacultyPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
