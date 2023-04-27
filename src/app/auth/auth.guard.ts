import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {};

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log('CanActivate called');
    let isLoggedIn = this.authService.isLoggedIn();
    //Check user authentication status, check psuID in route to match authenticated profile
    if(isLoggedIn && this.authService.isStudent()) {
      console.log('From AuthGuard - Student is definitely logged in!  ', isLoggedIn);
      return true;
    }
    else if(isLoggedIn && this.authService.isFaculty()) {
      console.log('From AuthGuard - Faculty is definitely logged in!  ', isLoggedIn);
      return true;
    }
    else {
      console.log('From AuthGuard - User is definitely not logged in!  ', isLoggedIn);
      return this.router.navigate(['/auth-callback']);
    }


  }
  
}
