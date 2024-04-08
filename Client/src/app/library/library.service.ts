import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Book } from '../shared/models/book';
import { Publisher } from '../shared/models/publisher';
import { Category } from '../shared/models/category';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'book?pageSize=50');
  }

  getPublishers() {
    return this.http.get<Publisher[]>(this.baseUrl + 'publisher');
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }


}
