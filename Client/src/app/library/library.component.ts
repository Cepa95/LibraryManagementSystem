import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';
import { Publisher } from '../shared/models/publisher';
import { Category } from '../shared/models/category';
import { LibraryParams } from '../shared/models/libraryParams';
import { Subject, debounceTime } from 'rxjs';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  books: Book[] = [];
  publishers: Publisher[] = [];
  categories: Category[] = [];
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
    protected authService: AuthService) {
    this.searchUpdated
      .pipe(debounceTime(300))
      .subscribe((search) => this.onSearch(search));
  }
  ngOnInit(): void {
    this.getBooks();
    this.getPublishers();
    this.getCategories();
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
