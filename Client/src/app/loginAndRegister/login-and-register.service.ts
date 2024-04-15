import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {
  baseUrl = 'https://localhost:5001/api/';
  
  constructor() { }
}
