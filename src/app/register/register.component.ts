import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { 
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)] ],
      lastName: ['', [Validators.required, Validators.minLength(2)] ],
      email: ['', [Validators.required, Validators.email], this.isEmailAvailable()],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.isStrongPassword()]],
        confirmPassword: ['', [Validators.required, this.confirmPasswordSameAsPassword()]]
      })
    })
  }

  onSubmit() {
    alert("Form submitted");
  }

  isEmailAvailable(): ValidatorFn {
    return (contorl: AbstractControl): {[key:string]: any} => {
      const email = contorl.value;
      if(email != null) {
        return new Promise(resolve => {
          this.authService.isEmailAvailable(email).subscribe((res) => {
            if(res['emailAvailable']) {
              resolve(null);
            } else {
              resolve({'emailTaken':contorl.value})
            }
          });
        });
      }
      return null;
    }
  }

  confirmPasswordSameAsPassword() : ValidatorFn {
    return (control: AbstractControl): {[key:string]: any} => {
      if(control.parent != null) {
        const confirmPassword = control.value;
        const password = control.parent.controls['password'].value;
        if(!password || !confirmPassword) {
          return { 'passwordsNotSame': control.value};
        }
        if(password == confirmPassword) {
          return null;
        } else {
          return { 'passwordsNotSame': control.value};
        }
      } else {
        return { 'passwordsNotSame': control.value};
      }
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

  get password() {
    return this.registerForm.get('passwords').get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('passwords').get('confirmPassword');
  }
}
