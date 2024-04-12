import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isCollapsed = true;

  constructor(private router: Router) { }

  navigateToLoginPage() {
    console.log('Navigating to login page');
    this.router.navigate(['account/login']);
    console.log(this.router);
   }
   navigateToSignUpPage() {
    console.log('Navigating to register page');
    this.router.navigate(['account/register']);
    console.log(this.router);
   }
}
