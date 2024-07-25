import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isCollapsed = true;
  isLoggedIn = false; // Boolean flag to track user's authentication status

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Initialize isLoggedIn based on the initial login status
    this.isLoggedIn = this.authService.getToken() !== null;

    // Listen for changes in login status
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoggedIn = loggedIn;
    });

    // Listen for router navigation events
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current URL indicates that the user is logged in
        this.isLoggedIn = this.authService.getToken() !== null;
      }
    });
  }

  navigateToLoginPage() {
    console.log('Navigating to login page');
    this.router.navigate(['/account/login']);
  }

  navigateToSignUpPage() {
    console.log('Navigating to register page');
    this.router.navigate(['/account/register']);
  }

  navigateToConfigPage(){
    console.log('Navigating to user configuration page');
    this.router.navigate(['/account/config']);
  }
  
  logout() {
    console.log('Logging out');
    this.authService.logout().subscribe(() => {
      // After successful logout, update isLoggedIn flag
      this.isLoggedIn = false;
      this.authService.isLoggedIn.emit(false); // Emit false after logout
    });
  }
 
   navigateToLoanPage() {
    console.log('Navigating to loan page');
    this.router.navigate(['/loan']);
    console.log(this.router);
   }
}
