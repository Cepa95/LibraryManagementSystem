import { Component, OnInit } from '@angular/core';
import { Book } from './shared/models/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Library';
  books: Book[] = [];
  isLoggedIn: boolean = false;
  loggedInUserEmail: string | null = null;

  constructor() { }

  ngOnInit(): void {
    // Check if token exists in session storage
    const token = sessionStorage.getItem('token');
    if (token) {
      // Token exists, user is logged in
      this.isLoggedIn = true;
      // Extract and decode JWT payload to get user email
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.loggedInUserEmail = payload.email;
      // Log user's email
      console.log(`User logged in with email: ${this.loggedInUserEmail}`);
    }
  }
}
