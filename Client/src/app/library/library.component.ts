import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';
import { Publisher } from '../shared/models/publisher';
import { Category } from '../shared/models/category';
import { LibraryParams } from '../shared/models/libraryParams';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
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

  constructor(private libraryService: LibraryService) {}

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
      next: (response) =>
        (this.categories = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
    });
  }

  onCategorySelected(event: any) {
    this.libraryParams.categoryId = +event.target.value;
    this.getBooks();
  }

  onPublisherSelected(publisherId: number) {
    this.libraryParams.publisherId = publisherId;
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
}
