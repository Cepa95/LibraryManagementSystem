import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginAndRegisterService } from '../login-and-register.service';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

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
  ) { }

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

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private createUser() {
    const userData = this.form.value;
  
    // Convert the string representation of dob to a Date object
    const dobDate = new Date(userData.dob);
  
    console.log('Date of birth before formatting:', userData.dob);
    console.log('Type of dobDate:', typeof dobDate);
    console.log('Value of dobDate:', dobDate);
  
    // Format the date object
    const formattedDob = this.formatDate(dobDate);
  
    console.log('Date of birth after formatting:', formattedDob);
  
    // Update userData with the formatted date
    userData.dob = formattedDob;
  
    userData.role = 'BasicUser';
  
    this.loginAndRegisterService.register(userData).subscribe(
      (user) => {
        console.log('User created successfully:', user);
        this.navigateToSignInPage();
      },
      (error) => {
        console.error('Error creating user:', error);
        // Handle the error
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
