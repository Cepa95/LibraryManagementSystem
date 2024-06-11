import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';
import { Publisher } from '../shared/models/publisher';
import { Category } from '../shared/models/category';
import { LibraryParams } from '../shared/models/libraryParams';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { Author } from '../shared/models/author';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  isAdmin: boolean = false;
  books: Book[] = [];
  publishers: Publisher[] = [];
  authors: Author[] = [];
  categories: Category[] = [];
  selectedAuthorId?: number;
  libraryParams = new LibraryParams();
  sortOptions = [
    { name: 'Alphabetical: A to Z', value: 'titleAsc' },
    { name: 'Alphabetical: Z to A', value: 'titleDesc' },
    { name: 'Pages: more to less', value: 'pagesDesc' },
    { name: 'Pages: less to more', value: 'pagesAsc' },
    { name: 'Copies: more to less', value: 'copiesDesc' },
    { name: 'Copies: less to more', value: 'copiesAsc' },
  ];

  totalCount = 0;
  searchUpdated = new Subject<string>();

  constructor(
    private libraryService: LibraryService,
    private authService: AuthService) {
    this.searchUpdated
      .pipe(debounceTime(300))
      .subscribe((search) => this.onSearch(search));
  }
  ngOnInit(): void {
    this.checkAdminStatus();
    this.getBooks();
    this.getPublishers();
    this.getCategories();
    this.getAuthors();
  }

  checkAdminStatus() {
    const userRole = this.authService.getUserRole();
    this.isAdmin = userRole === 'Admin';
  }

  getBooks() {
    this.libraryService.getBooks(this.libraryParams).subscribe({
      next: (response) => {
        this.books = response.data;
        this.libraryParams.pageNumber = response.pageIndex;
        this.libraryParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error) => console.log(error),
    });
  }

  getPublishers() {
    this.libraryService.getPublishers().subscribe({
      next: (response) =>
        (this.publishers = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  getCategories() {
    this.libraryService.getCategories().subscribe({
      next: (response: any) =>
        (this.categories = [{ id: 0, name: 'All' }, ...response]),
      error: (error: any) => console.log(error),
    });
  }

  getAuthors() {
    this.libraryService.getAuthors().subscribe({
      next: (response: any) =>
        (this.authors = [{ id: 0, firstName: 'All'}, ...response]),
      error: (error: any) => console.log(error),
    });
  }

  onCategorySelected(event: any) {
    this.libraryParams.categoryId = +event.target.value;
    this.libraryParams.pageNumber = 1;
    this.getBooks();
  }

  onPublisherSelected(publisherId: number) {
    this.libraryParams.publisherId = publisherId;
    this.libraryParams.pageNumber = 1;
    this.getBooks();
  }
  
  onAuthorSelected(author: Author) {
    this.selectedAuthorId = author.id;
    this.libraryParams.pageNumber = 1; // Reset to the first page

    if (author.firstName === 'All') {
      this.getBooks();
    } else {
      this.libraryService.getBooksByAuthor(author.id).subscribe({
        next: (response) => {
          this.books = response;
          this.totalCount = response.length;
        },
        error: (error) => console.log(error),
      });
    }
  }

  onSortSelected(event: any) {
    this.libraryParams.sort = event.target.value;
    this.getBooks();
  }

  onPageChanged(event: any) {
    if (this.libraryParams.pageNumber !== event.page) {
      this.libraryParams.pageNumber = event.page;
      this.getBooks();
    }
  }

  onSearch(search: string) {
    this.libraryParams.search = search;
    this.libraryParams.pageNumber = 1;
    this.getBooks();
  }

  onReset() {
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.libraryParams = new LibraryParams();
    this.getBooks();
  }

  handleBookDeleted(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
    this.totalCount--;
  }
}
