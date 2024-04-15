import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  isCollapsed = true;

  constructor(private router: Router) { }
  navigateToSignUpPage() {
    console.log('Navigating to register page');
    this.router.navigate(['register']);
    console.log(this.router);
  }
}