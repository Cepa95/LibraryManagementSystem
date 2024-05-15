import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-userConfig',
    templateUrl: './userConfig.component.html',
    styleUrls: ['./userConfig.component.scss']
  })

  export class UserConfigComponent implements OnInit {

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
      if (userRole !== 'Admin') {
        // Redirect to home or unauthorized page
        this.router.navigate(['/']); // Redirect to home
        // Optionally, you can redirect to an unauthorized page or show a message
        return;
      }
    
      // User is authenticated and has admin role, continue with component initialization
    }
    
  }
