import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isCollapsed = true;

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
    this.authService.login(this.userCredentials.email, this.userCredentials.password).subscribe(
      (loggedIn) => {
        if (loggedIn) {
          console.log('Login successful');
          const user = this.authService.currentUser;
          alert(`Welcome, ${user.firstName} ${user.lastName}!`);
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
