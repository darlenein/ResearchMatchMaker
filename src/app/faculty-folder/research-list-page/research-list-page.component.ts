import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ServiceDispatcher } from '../../ServiceDispatcher';

@Component({
  selector: 'app-research-list-page',
  templateUrl: './research-list-page.component.html',
  styleUrls: ['./research-list-page.component.css']
})
export class ResearchListPageComponent implements OnInit {

  research: any; 
  facultyID: string;

  constructor(private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    // this.route.queryParams.subscribe(params => {
    //   this.facultyID = params["facultyID"];
    // });
   }

  ngOnInit(): void {
    this.serviceDispatcher.getAllResearch().subscribe(response => {
      this.research = response
    });
  }

  separateByComma(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  goToProfile(id:string){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": id
      }
    };
    this.router.navigate(['/view-faculty-profile'], navigationExtras);
    //this.router.navigate(['']);
  }

}
