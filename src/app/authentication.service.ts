import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';
import { JwtHelper } from 'angular2-jwt';
import { Register } from './models/register';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: String, password: String) {
    return this.http.post('http://athena.a2hosted.com/Account/Login', JSON.stringify({ Username: username, password: password }), httpOptions)
      .map((response: Response) => {
        const jwtHelper = new JwtHelper();
        localStorage.setItem('token', response['token']);
        localStorage.setItem('role', jwtHelper.decodeToken(response['token'])['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      });
  }

  logout() {
    localStorage.clear();
  }

  isEmailAvailable(email: string) {
    return this.http.post('http://athena.a2hosted.com/Account/IsEmailAvailable', JSON.stringify({ Email: email }), httpOptions);
  }

  register(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post('http://athena.a2hosted.com/Account/Register', JSON.stringify({ FirstName: firstName, LastName: lastName, Email: email, Password: password }), httpOptions);
  }
}
