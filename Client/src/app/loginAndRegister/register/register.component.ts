import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  isCollapsed = true;

  constructor(private router: Router) { }
  navigateToSignInPage() {
    console.log('Navigating to login page');
    this.router.navigate(['/account/login']);
    console.log(this.router);
  }
  ngOnInit() {
  }

}
