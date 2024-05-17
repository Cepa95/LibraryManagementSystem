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
    const { email, password } = this.userCredentials;
    this.authService.login(email, password).subscribe(
      () => {
        console.log('Login successful');
        this.router.navigate(['library']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please try again later.');
      }
    );
  }
}

