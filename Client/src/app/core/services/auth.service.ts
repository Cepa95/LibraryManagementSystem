import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'https://localhost:5001/api/account/login'; // Update with your API URL
  private logoutUrl = 'https://localhost:5001/api/account/logout';
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<string>('https://localhost:5001/api/account/login', { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): Observable<void> {
    // Perform logout logic here, such as sending a request to the server to invalidate the session
    return this.http.post<void>(this.logoutUrl, null);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      if (error.error && Object.keys(error.error).length > 0 && error.error.text) {
        // Check if the error object is not empty and contains a text field
        const token = error.error.text;
        console.error(`Login successful. JWT token received: ${token}`);
        // Return the token
        return of(token);
      } else {
        // Indicate an unexpected response
        console.error(
          `Backend returned code ${error.status}, ` +
          `but the response body was unexpected: ${JSON.stringify(error.error)}`);
      }
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }



}
