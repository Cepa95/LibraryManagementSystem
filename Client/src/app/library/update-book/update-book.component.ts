import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService } from '../library.service';
import { Publisher } from '../../shared/models/publisher';
import { Category } from '../../shared/models/category';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss'],
})
export class UpdateBookComponent implements OnInit {
  bookForm: FormGroup = this.formBuilder.group({
    Title: ['', Validators.required],
    Description: ['', Validators.required],
    SearchCriteria: ['', Validators.required],
    Pages: ['', Validators.required],
    ImageUrl: ['', Validators.required],
    NumberOfCopies: ['', Validators.required],
    PublisherId: ['', Validators.required],
    CategoryId: ['', Validators.required],
  });
  error: string | undefined;
  publishers: Publisher[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private libraryService: LibraryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  updateBook() {
    if (this.bookForm.valid) {
      const bookId = this.route.snapshot.paramMap.get('id');
      if (bookId) {
        this.libraryService
          .updateBook(+bookId, this.bookForm.value)
          .subscribe(() => {
            this.router.navigate(['/library']);
          });
      } else {
        this.error =
          'An error occurred while updating the book. Please try again.';
      }
    }
  }

  initializeForm(): void {
    this.libraryService
      .getPublishers()
      .subscribe((publishers: any) => (this.publishers = publishers));
    this.libraryService
      .getCategories()
      .subscribe((categories: any) => (this.categories = categories));
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.libraryService.getBookWithKeys(+bookId).subscribe((book: any) => {
        this.bookForm.setValue({
          Title: book.title,
          Description: book.description,
          SearchCriteria: book.searchCriteria,
          Pages: book.pages,
          ImageUrl: book.imageUrl,
          NumberOfCopies: book.numberOfCopies,
          PublisherId: book.publisherId,
          CategoryId: book.categoryId,
        });
      });
    } else {
      this.error =
        'An error occurred while updating the book. Please try again.';
    }
  }
}
