import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit{

  books: Book[] = [];

  constructor(private libraryService: LibraryService) { }
  
  ngOnInit(): void {
    this.libraryService.getBooks().subscribe({
      next: (response: any) => this.books = response.data,
      error: (error: any) => console.log(error)
    })
  }

}
