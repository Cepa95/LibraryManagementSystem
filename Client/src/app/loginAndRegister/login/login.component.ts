import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  userCredentials: any = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  navigateToSignUpPage() {
    console.log('Navigating to register page');
    this.router.navigate(['account/register']);
  }

  login() {
    console.log('Logging in...');
    const { email, password } = this.userCredentials; // Destructure email and password from userCredentials
    this.authService.login(email, password).subscribe(
      (token) => {
        if (token) {
          console.log('Login successful');
          // Store the token in local storage or a cookie if needed
          localStorage.setItem('token', token);
          // Redirect to the desired page after successful login
          this.router.navigate(['library']);
        } else {
          console.error('Login failed');
          alert('Login failed. Please check your credentials and try again.');
        }
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again later.');
      }
    );
  }
  
}
