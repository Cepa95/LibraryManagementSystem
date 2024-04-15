import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LibraryService } from '../library.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup = new FormGroup({
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    searchCriteria: new FormControl(null, Validators.required),
    pages: new FormControl(null, [Validators.required, Validators.min(1)]),
    imageUrl: new FormControl(null, Validators.required),
    numberOfCopies: new FormControl(null, [Validators.required, Validators.min(1)]),
    publisherId: new FormControl(null, Validators.required),
    categoryId: new FormControl(null, Validators.required)
  });

  publishers: any[] = [];
  categories: any[] = [];
  error: string | undefined;

  constructor(private libraryService: LibraryService, private router: Router) {}

  ngOnInit() {
    this.libraryService.getPublishers().subscribe((publishers) => {
      this.publishers = publishers as any;
    });

    this.libraryService.getCategories().subscribe((categories) => {
      this.categories = categories as any;
    });
  }

  onSubmit() {
    this.libraryService.addBook(this.bookForm.value).subscribe({
      next: () => {
        this.router.navigate(['/library']);
      },
      error: (error) => {
        console.log(error);
        this.error = 'An error occurred while adding the book. Please try again.';
      },
    });
  }
}