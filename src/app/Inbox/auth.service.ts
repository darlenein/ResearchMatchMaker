import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserCred {
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


  clickInbox(userCred: UserCred){
    return this.http.post(`${this.rootUrl}/auth/signin`, userCred, {withCredentials: true})
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );

   }

  
}
