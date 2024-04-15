import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Book } from '../shared/models/book';
import { Publisher } from '../shared/models/publisher';
import { Category } from '../shared/models/category';
import { LibraryParams } from '../shared/models/libraryParams';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {}

  getBooks(libraryParams: LibraryParams) {
    let params = new HttpParams();

    if (libraryParams.categoryId > 0) params = params.append('categoryId', libraryParams.categoryId);
    if (libraryParams.publisherId) params = params.append('publisherId', libraryParams.publisherId);
    params = params.append('sort', libraryParams.sort);
    params = params.append('pageIndex', libraryParams.pageNumber);
    params = params.append('pageSize', libraryParams.pageSize);
    if (libraryParams.search) params = params.append('search', libraryParams.search);

    return this.http.get<Pagination<Book[]>>(this.baseUrl + 'book', { params });
  }

  getPublishers() {
    return this.http.get<Publisher[]>(this.baseUrl + 'publisher');
  }

  updateBook(id: number, book: Book) {
    return this.http.put(this.baseUrl + 'book/' + id, book);
  }

  deleteBook(id: number) {
    return this.http.delete(this.baseUrl + 'book/' + id);
  }

  getBook(id: number) {
    return this.http.get<Book>(this.baseUrl + 'book/' + id);
  }

  getBookWithKeys(id: number) {
    return this.http.get<Book>(this.baseUrl + 'book/keys/' + id);
  }

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'category');
  }

  addBook(book: Book) {
    return this.http.post(this.baseUrl + 'book', book);
  }

  
}
