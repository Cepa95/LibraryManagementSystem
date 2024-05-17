import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    console.log('Logging out...');
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful');
        // Clear any user-related data or tokens stored in the client-side storage
        localStorage.removeItem('token');
        // Redirect the user to the login page or any other desired page
        this.router.navigate(['account/login']);
      },
      (error: any) => {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again later.');
      }
    );
  }
}
