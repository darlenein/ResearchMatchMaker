import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { StudentModel } from 'src/app/models/student.model';
import { ServiceDispatcher } from '../../ServiceDispatcher';
import { Email } from 'src/app/Inbox/email';
import { EmailService } from 'src/app/Inbox/email.service';

@Component({
  selector: 'app-view-student-page',
  templateUrl: './view-student-page.component.html',
  styleUrls: ['./view-student-page.component.css']
})
export class ViewStudentPageComponent implements OnInit {

  student = new StudentModel();
  splitSkills: any;
  splitResearchInterest: any;
  psuID: string;

  //Inbox Stuff
  showModal = false;
  email: Email;
  defaultImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

  constructor(private emailService: EmailService, private router: Router, public serviceDispatcher: ServiceDispatcher, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.psuID = params["psuID"];
    });


    
  }

  ngOnInit(): void {
    this.serviceDispatcher.getStudent(this.psuID).subscribe(response => {
      this.student = response
      this.splitSkills = this.separateBySemicolon(this.student.skills);
      this.splitResearchInterest = this.separateBySemicolon(this.student.research_Interest);
    });

    // this.serviceDispatcher.getStudent('dxi5017').subscribe(response => {
    //   this.student = response
    //   this.splitSkills = this.separateBySemicolon(this.student.skills);
    //   this.splitResearchInterest = this.separateBySemicolon(this.student.research_Interest);
    // });
  }

  separateBySemicolon(rawText: String) {
    let text = rawText.split(';');
    return text;
  }

  goToEditProfile(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "psuID": this.psuID
      }
    };
    
    this.router.navigate(['/edit-student-profile'], navigationExtras);
  }

  //Inbox Stuff
  onSubmit(email: Email) {
    //send email
    this.emailService.sendEmail(email).subscribe(() => {
      this.showModal = false;
    });
  }

}
