import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_model = new Login();

  constructor() { }

  ngOnInit() {
  }

  get diagnostic() {
    return JSON.stringify(this.login_model);
  }

  login() {
    alert("Login");
  }
}
