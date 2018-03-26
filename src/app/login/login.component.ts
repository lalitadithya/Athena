import { Component, OnInit } from '@angular/core';
import { Login } from '../models/login';
import { AuthenticationService } from '../authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean;
  inProgress: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthenticationService) { 
    this.constructForm();
  }

  ngOnInit() {
  }

  constructForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.inProgress = true;
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
    .subscribe(result => {
      this.inProgress = false;
      this.router.navigateByUrl('/data-scientist');
    }, error => {
      this.inProgress = false;
      this.invalidLogin = true;
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
