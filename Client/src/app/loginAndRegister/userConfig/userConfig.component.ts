import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-userConfig',
  templateUrl: './userConfig.component.html',
  styleUrls: ['./userConfig.component.scss']
})
export class UserConfigComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      // Redirect to login if not authenticated
      this.router.navigate(['/login']);
      return;
    }

    // Get user's role
    const userRole = this.authService.getUserRole();

    // Check if user has admin role
    if (userRole === 'Admin') {
      this.isAdmin = true;
    }
  }
}
