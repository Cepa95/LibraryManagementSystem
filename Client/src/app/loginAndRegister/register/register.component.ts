import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isCollapsed = true;
  form!: FormGroup; // Declare the form property

  constructor(private router: Router, private formBuilder: FormBuilder) { } // Add FormBuilder

  ngOnInit() {
    this.buildForm(); // Initialize the form
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)]],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dob: ['', Validators.required]
    }, { validator: this.passwordMatchValidator('password', 'confirmPassword') });
  }

  navigateToSignInPage() {
    console.log('Navigating to login page');
    this.router.navigate(['/account/login']);
    console.log(this.router);
  }

  submitForm() {
    if (this.form.valid) {
      console.log(this.form.value);
      console.log('Form submitted!');
    } else {
      console.log('Form is invalid');
    }
  }

  private passwordMatchValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.get(controlName);
      const confirmPasswordControl = formGroup.get(matchingControlName);

      if (passwordControl?.value !== confirmPasswordControl?.value) {
        confirmPasswordControl?.setErrors({ notSame: true });
      } else {
        confirmPasswordControl?.setErrors(null);
      }
    };
  }
}
