import { Injectable } from '@angular/core';
import { BookDetailsComponent } from '../../library/book-details.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../../shared/models/loan';
@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }
  private cart: number[] = [];
  addLoan(id: number): Observable<Loan>{
    return this.http.post<Loan>(`${this.baseUrl}loan/add`, {BookId: id });
  }

  getLoan(){
    
  }
}
