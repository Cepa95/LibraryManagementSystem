import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Book } from '../shared/models/book';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'book?pageSize=50');
  }
}
