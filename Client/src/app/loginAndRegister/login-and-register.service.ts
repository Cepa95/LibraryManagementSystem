import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {
  private baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}account`);
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}account/login`, { email, password });
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}account/register`, user);
  }

  checkEmailExistence(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}account/check-email-existence?email=${encodeURIComponent(email)}`);
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}account/${userId}`);
  }
}
