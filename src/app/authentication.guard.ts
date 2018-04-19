import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      console.log('got token');
      const jwtHelper = new JwtHelper();
      if (!jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
          console.log('token expired');
          return true;
      }
      console.log('token valid');
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
