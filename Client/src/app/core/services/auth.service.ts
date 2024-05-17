import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:5001/api/account/login';
  private logoutUrl = 'https://localhost:5001/api/account/logout';
  private tokenKey = 'token';
  isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private http: HttpClient,private router:Router) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(this.loginUrl, { email, password }).pipe(
      tap(response => {
        sessionStorage.setItem(this.tokenKey, response.token);
        this.isLoggedIn.emit(true);
        console.log('Login successful, token stored.');
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(this.logoutUrl, null).pipe(
      tap(() => {
        sessionStorage.removeItem(this.tokenKey);
        this.isLoggedIn.emit(false);
        console.log('Logout successful, token removed.');
        this.router.navigate(['account/login']);
      }),
      catchError(error => {
        console.error('Error during logout:', error);
        return throwError(error);
      })
    );
  }

  getToken(): string | null {
    const token = sessionStorage.getItem(this.tokenKey);
    console.log('Retrieved token:', token);
    return token;
  }

  decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decodedToken = JSON.parse(jsonPayload);
      console.log('Decoded token:', decodedToken);
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const userId = decodedToken?.nameid ? Number(decodedToken.nameid) : null;
      console.log('User ID from token:', userId);
      return userId;
    }
    return null;
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.decodeToken(token);
      const userRole = decodedToken?.role ?? null;
      console.log('User role from token:', userRole);
      return userRole;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status === 0) {
        errorMessage = 'Server unavailable';
      } else {
        try {
          errorMessage = error.error.message || error.statusText;
        } catch (e) {
          errorMessage = 'Unknown error';
        }
      }
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
