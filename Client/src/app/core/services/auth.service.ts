import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogged: boolean = false;
  currentUser: any;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>('https://localhost:5001/api/account/login', { email, password })
      .pipe(
        map(response => {
          if (response) { // Assuming your backend returns user data upon successful login
            this.isLogged = true;
            this.currentUser = response;
            return true; // Return true for successful login
          } else {
            return false; // Return false for failed login
          }
        })
      );
  }

  logout(): void {
    // Perform logout logic here, such as clearing session data
    this.isLogged = false;
    this.currentUser = null; // Clear user information on logout
  }
}
