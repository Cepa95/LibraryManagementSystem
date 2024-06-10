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
  categoryRecommendations: Book[] = [];
  authorRecommendations: Book[] = [];

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
          this.loadByCategoryRecommendations();
          this.loadByAuthorRecommendations();
        },
        error: err => console.log(err)
      });
    }
  }

  viewBook(bookId: number) {
    this.libraryService.getBook(bookId).subscribe({
      next: book => {
        this.book = book;
        this.loadByCategoryRecommendations();
        this.loadByAuthorRecommendations(); // Load recommendations for the new book
        this.router.navigate(['/library/', bookId]);
      },
      error: err => console.log(err)
    });
  }
  

  
  loadByAuthorRecommendations() {
    if (this.book && this.book.id) {
      this.libraryService.getAuthorBooks().subscribe({
        next: authorBooks => {
          console.log('Author Books:', authorBooks); // Log author books data
          const authorBook = authorBooks.find(ab => ab.bookId === this.book!.id);
          if (authorBook) {
            console.log('Author ID found:', authorBook.authorId); // Log author ID
            this.libraryService.getBooksByAuthor(authorBook.authorId).subscribe({
              next: recommendations => {
                console.log('Author Recommendations:', recommendations); // Log recommendations
                this.authorRecommendations = recommendations.filter(recommendation => recommendation.id !== this.book!.id);
              },
              error: err => console.log(err)
            });
          } else {
            console.log('Author ID not found for the book:', this.book?.title);
          }
        },
        error: err => console.log(err)
      });
    } else {
      console.log('Book ID not found.');
    }
  }
  
  
  loadByCategoryRecommendations() {
    if (this.book && this.book.category) {
      this.libraryService.getCategories().subscribe({
        next: categories => {
          const category = categories.find(cat => cat.name === this.book!.category);
          if (category) {
            const libraryParams: LibraryParams = new LibraryParams();
            libraryParams.categoryId = category.id;
            this.libraryService.getRecommendationsForBook(this.book!, libraryParams).subscribe({
              next: recommendations => {
                this.categoryRecommendations = recommendations;
                // Filter out the current book from recommendations
                this.categoryRecommendations = this.categoryRecommendations.filter(recommendation => recommendation.id !== this.book!.id);
              },
              error: err => console.log(err)
            });
          } else {
            console.log('Category not found for book:', this.book?.category);
          }
        },
        error: err => console.log(err)
      });
    } else {
      console.log('Book or book category is undefined.');
    }
  }
}
