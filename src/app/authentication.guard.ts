import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(): boolean {
        if(localStorage.getItem('token')) {
            let jwtHelper = new JwtHelper();
            if(!jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}