import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
}