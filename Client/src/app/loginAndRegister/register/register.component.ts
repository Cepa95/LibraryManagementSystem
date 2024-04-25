import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAndRegisterService } from '../login-and-register.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isCollapsed = true;
  form!: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginAndRegisterService: LoginAndRegisterService
  ) {}

  ngOnInit() {
    this.buildForm();
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

  private checkEmailExistence(email: string) {
    this.loginAndRegisterService.checkEmailExistence(email).subscribe(
      (exists: boolean) => {
        if (exists) {
          console.log('Email already exists');
          // Provide feedback to the user
          // For example, you can display an error message on the form
          this.form.get('email')?.setErrors({ emailExists: true });
        } else {
          // Continue with user creation
          this.createUser();
        }
      },
      (error) => {
        console.error('Error checking email existence:', error);
        // Handle the error - log it or display an error message to the user
        // For example, you can display a generic error message on the form
        // this.form.setErrors({ serverError: true });
      }
    );
  }

  private createUser() {
    const userData = this.form.value;
    userData.dob = formatDate(userData.dob, 'yyyy-MM-dd', 'en-US');
    this.loginAndRegisterService.register(userData).subscribe(
      (user) => {
        console.log('User created successfully:', user);
        this.navigateToSignInPage();
      },
      (error) => {
        console.error('Error creating user:', error);
        // Handle the error - log it or display an error message to the user
        // For example, you can display a generic error message on the form
        // this.form.setErrors({ serverError: true });
      }
    );
  }

  submitForm() {
    if (this.form.valid) {
      if (this.form.get('password')?.value !== this.form.get('confirmPassword')?.value) {
        console.log('Passwords do not match');
        return;
      }
      this.checkEmailExistence(this.form.get('email')?.value);
    } else {
      console.log('Form is invalid');
    }
  }

  navigateToSignInPage() {
    this.router.navigate(['/account/login']);
  }
}
