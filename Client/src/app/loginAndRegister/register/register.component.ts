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
  today:string;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginAndRegisterService: LoginAndRegisterService
  ) {    const todayDate = new Date();
    const year = todayDate.getFullYear();
    const month = ('0' + (todayDate.getMonth() + 1)).slice(-2);
    const day = ('0' + todayDate.getDate()).slice(-2);
    this.today = `${year}-${month}-${day}`; }

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
      dateOfBirth: ['', Validators.required]
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
  emailExistsError: boolean = false;
  private checkEmailExistence(email: string) {
    this.loginAndRegisterService.checkEmailExistence(email).subscribe(
      (exists: boolean) => {
        
        if (exists) {
          console.log('Email already exists');
          this.emailExistsError = true;
          this.form.get('email')?.setErrors({ emailExists: true });
        } else {
          this.emailExistsError = false;
          this.createUser();
        }
      },
      (error) => {
        console.error('Error checking email existence:', error);
        // Handle the error
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
  
    // Convert the string representation of date to a Date object
    const inputDate = new Date(userData.dateOfBirth);
  
    console.log('Date of birth before formatting:', userData.dateOfBirth);
    console.log('Type of Date:', typeof inputDate);
    console.log('Value of Date:', inputDate);
  
    // Format the date object
    const formattedDate = this.formatDate(inputDate);
  
    console.log('Date of birth after formatting:', formattedDate);
  
    // Update userData with the formatted date
    userData.dateOfBirth = formattedDate;
  
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
      console.error('Registration failed: check input data');
      console.log('Form is invalid');
      alert('Register failed. Please check your input and try again.');
    }
  }

  navigateToSignInPage() {
    this.router.navigate(['/account/login']);
  }
}
