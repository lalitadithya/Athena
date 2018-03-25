import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: String, password: String) {
    return this.http.post('http://localhost:57293/Account/Login', JSON.stringify({Username: username, password: password}), httpOptions)
    .map((response: Response) => {
      let jwtHelper = new JwtHelper();
      localStorage.setItem('token', response['token']);
      localStorage.setItem('role', jwtHelper.decodeToken(response['token'])['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    });
  }

  logout() {
    localStorage.clear();
  }
}
