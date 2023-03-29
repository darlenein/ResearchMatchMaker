import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Email } from './email';

interface EmailSummary{
  id: string;
  subjext: string;
  from: string;
}


@Injectable({
  providedIn: 'root'
})
export class EmailService {
  rootUrl = 'https://api.angular-email.com';

  constructor(private http: HttpClient) {

  }

  getEmails(){
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`, {withCredentials: true});
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`, {withCredentials: true});
  }

  sendEmail(email: Email){
    return this.http.post(`${this.rootUrl}/emails`, email, {withCredentials: true});
  }


}
