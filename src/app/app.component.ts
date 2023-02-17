import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './Inbox/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ResearchMatchMaker';
  signedin$: BehaviorSubject<boolean>;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  
}
