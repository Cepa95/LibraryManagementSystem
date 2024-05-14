import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:5001/api/account/login';
  private logoutUrl = 'https://localhost:5001/api/account/logout';
  private tokenKey = 'token';
  isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>(); // Event emitter for login status

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<string> {
    return this.http.post<{ token: string }>(this.loginUrl, { email, password }).pipe(
      tap(response => {
        sessionStorage.setItem(this.tokenKey, response.token);
        this.isLoggedIn.emit(true); // Emit event upon successful login
      }),
      catchError(this.handleError)
    );
  }


  logout(): Observable<void> {
    console.log('Calling logout service');
    return this.http.post<void>(this.logoutUrl, null).pipe(
      tap(() => {
        console.log('Logout successful');
        sessionStorage.removeItem(this.tokenKey);
        this.isLoggedIn.emit(false); // Emit event upon logout
      }),
      catchError(error => {
        console.error('Error during logout:', error);
        return throwError(error); // Propagate the error
      })
    );
  }


  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('An error occurred:', error);

    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
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
