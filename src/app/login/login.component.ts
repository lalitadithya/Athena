import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login_model = new Login();

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  get diagnostic() {
    return JSON.stringify(this.login_model);
  }

  login() {
    alert("Login");
    this.authService.login(this.login_model.email, this.login_model.password)
    .subscribe(result => {
      alert("log in successfull");
    }, error => {
      alert("failed");
    }, () => {
      
    });
  }
}
