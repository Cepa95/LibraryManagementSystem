import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit {
  book?: Book;

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.loadBook();
  }

  navigateToBookDetailsPage() {
    alert('Alooo');
    if (this.book && this.book.id) {
      console.log(`Navigating to book details page for book id ${this.book.id}`);
      this.router.navigate(['library', this.book.id]); // Removed the trailing slash after 'library'
    } else {
      console.log('Book id is not available');
    }
  }
  
  loadBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) this.libraryService.getBook(+id).subscribe({
      next: book => this.book = book,
      error: err => console.log(err)
    })
  }

}
