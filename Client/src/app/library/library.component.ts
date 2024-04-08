import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';
import { Publisher } from '../shared/models/publisher';
import { Category } from '../shared/models/category';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss',
})
export class LibraryComponent implements OnInit {
  books: Book[] = [];
  publishers: Publisher[] = [];
  categories: Category[] = [];

  constructor(private libraryService: LibraryService) {}

  ngOnInit(): void {
    this.getBooks();
    this.getPublishers();
    this.getCategories();
   
  }

  getBooks(){
    this.libraryService.getBooks().subscribe({
      next: (response) => (this.books = response.data),
      error: (error) => console.log(error),
    });
  }

  getPublishers(){
    this.libraryService.getPublishers().subscribe({
      next: (response) => (this.publishers = response),
      error: (error) => console.log(error),
    });
  }

  getCategories(){
    this.libraryService.getCategories().subscribe({
      next: (response) => (this.categories = response),
      error: (error) => console.log(error),
    });
  }
}
