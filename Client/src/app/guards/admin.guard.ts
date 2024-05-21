import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login page if not authenticated
      return false;
    }
    
    // Check if the user has admin role
    if (this.authService.getUserRole() !== 'Admin') {
      this.router.navigate(['/']); // Redirect to home page if not admin
      return false;
    }

    return true; // Allow access to the route for authenticated users with admin role
  }
}
