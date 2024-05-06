import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAndRegisterService } from '../login-and-register.service';
import { NgModule } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isCollapsed = true;

  // Add a new property to hold user credentials
  userCredentials: any = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private loginAndRegisterService: LoginAndRegisterService) { }

  navigateToSignUpPage() {
    console.log('Navigating to register page');
    this.router.navigate(['account/register']);
  }

  // Method to handle login
  login() {
    console.log('Logging in...');
    // Call the login service method with user credentials
    this.loginAndRegisterService.login(this.userCredentials.email, this.userCredentials.password).subscribe(
      () => {
        console.log('Login successful');
        // Navigate to the appropriate page after successful login
        this.router.navigate(['library']); // Replace 'library' with the desired route
      },
      (error) => {
        console.error('Login failed:', error);
        // Display an error message to the user
        alert('Login failed. Please check your credentials and try again.');
      }
    );
  }
}