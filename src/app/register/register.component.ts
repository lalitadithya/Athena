import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)] ],
      lastName: ['', [Validators.required, Validators.minLength(2)] ],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.isStrongPassword()]],
        confirmPassword: ['', Validators.required]
      }, {validator: this.areEqual}),
      dateOfBirth: ['', Validators.required]
    })
  }

  onSubmit() {
    alert("Form submitted");
  }

  areEqual(group: AbstractControl):{notEqual: boolean} {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    if(!password || !confirmPassword) {
      return { notEqual: true};
    }
    if(password == confirmPassword) {
      return null;
    } else {
      return { notEqual: true};
    }
  }

  isStrongPassword(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} =>
    {
      if(/[a-z]/.test(control.value) && /[A-Z]/.test(control.value) && /[0-9]/.test(control.value) && /[^A-Za-z0-9 ]/.test(control.value))
      {
        return null;
      } 
      else 
      {
        return {'strongPassword':{value:control.value}};
      }
    };
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get passwords() {
    return this.registerForm.get('passwords');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  get password() {
    return this.registerForm.get('passwords').get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('passwords').get('confirmPassword');
  }
}
