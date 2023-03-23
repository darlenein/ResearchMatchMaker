import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UserCred {
  username: string;
  password: string;
}

interface Response {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  rootUrl = 'https://api.angular-email.com';
  signedin$ = new BehaviorSubject(true);
  username = '';

  checkAuth() {
    return this.http.get<Response>(`${this.rootUrl}/auth/signedin`)
      .pipe(
        tap(({ username }) => {
          this.username = username;
        })
      )
  }

  clickInbox(userCred: UserCred){
    return this.http.post(`${this.rootUrl}/auth/signin`, userCred, {withCredentials: true})
      .pipe(
        tap(({ }) => {
          this.signedin$.next(true);
          this.username = userCred.username;
        })
      );

   }

  
}
