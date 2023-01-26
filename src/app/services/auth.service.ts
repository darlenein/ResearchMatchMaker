import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User} from 'oidc-client';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private manager = new UserManager(getClientSettings());
  private user: User | null;
  constructor() {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }
  
  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }
  
  getClaims(): any {
    if(this.user == null) {
      return null;
    }
    else {
      return this.user.profile;
    }
  }

  getAuthorizationHeaderValue(): string {
    if(this.user == null) {
      return "User not found (object is null)";
    }
    else {
      return `${this.user.token_type} ${this.user.access_token}`;
    }
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
      return this.manager.signinRedirectCallback().then(user => {
          this.user = user;
      });
  }
}

export function getClientSettings(): UserManagerSettings {
    return {
        authority: 'https://login.microsoftonline.com/7cf48d45-3ddb-4389-a9c1-c115526eb52e/',
        client_id: '2c8037bf-a5f2-455b-9020-df58af5387ab',
        redirect_uri: 'http://localhost:4200/auth-callback',
        post_logout_redirect_uri: 'http://localhost:4200/',
        response_type:"code",
        scope:"openid profile api1",
        filterProtocolClaims: true,
        loadUserInfo: true
    };
}
