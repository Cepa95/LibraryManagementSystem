import { Component, OnInit } from '@angular/core';
import { Book } from '../shared/models/book';
import { LibraryService } from './library.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../shared/models/category';
import { LibraryParams } from '../shared/models/libraryParams';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book?: Book;
  recommendations: Book[] = [];

  constructor(private libraryService: LibraryService,
     private activatedRoute: ActivatedRoute,
     private router: Router
    ) { }

  ngOnInit(): void {
    this.loadBook();
  }

  loadBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.libraryService.getBook(+id).subscribe({
        next: book => {
          this.book = book;
          // Load recommendations after loading the book
          this.loadRecommendations();
        },
        error: err => console.log(err)
      });
    }
  }

  viewBook(bookId: number) {
    this.libraryService.getBook(bookId).subscribe({
      next: book => {
        this.book = book;
        this.loadRecommendations(); // Load recommendations for the new book
        this.router.navigate(['/library/', bookId]);
      },
      error: err => console.log(err)
    });
  }
  

  loadRecommendations() {
    if (this.book && this.book.category) {
      this.libraryService.getCategories().subscribe({
        next: categories => {
          const category = categories.find(cat => cat.name === this.book!.category);
          if (category) {
            const libraryParams: LibraryParams = new LibraryParams();
            libraryParams.categoryId = category.id;
            // Check if this.book is not undefined before calling getRecommendationsForBook
            if (this.book) {
              this.libraryService.getRecommendationsForBook(this.book, libraryParams).subscribe({
                next: recommendations => {
                  this.recommendations = recommendations;
                  // Filter out the current book from recommendations
                  this.recommendations = this.recommendations.filter(recommendation => recommendation.id !== this.book!.id);
                },
                error: err => console.log(err)
              });
            }
          } else {
            console.log('Category not found for book:', this.book!.category);
          }
        },
        error: err => console.log(err)
      });
    } else {
      console.log('Book or book category is undefined.');
    }
  }
}
