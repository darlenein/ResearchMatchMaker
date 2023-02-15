import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface FacultyCred {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(true);


  clickInbox(facultyCred: FacultyCred){
    return this.http.post(`${this.rootUrl}/auth/signin`, facultyCred)
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );

   }

  
}
