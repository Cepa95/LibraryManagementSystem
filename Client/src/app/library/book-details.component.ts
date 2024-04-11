import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  book?: Book;

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.loadBook();
  }

  loadBook(){
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) this.libraryService.getBook(+id).subscribe({
      next: book => this.book = book,
      error: err => console.log(err)
    })
  }

}
