// book-item.component.ts
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Book } from '../../shared/models/book';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LibraryService } from '../library.service';
import { AuthService } from '../../core/services/auth.service';
import { LoanService } from '../../loanComponent/loan/loan.service';
import { Router} from '@angular/router';
import { Loan } from '../../shared/models/loan'; 

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
})
export class BookItemComponent {
  @Input() book?: Book;
  @Output() bookDeleted = new EventEmitter();
  modalRef?: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private libraryService: LibraryService,
    private authService:AuthService,
    private loanService: LoanService,
    private router: Router
  ) {}

  loanBook(bookId: number) {
    const loanDate = new Date().toISOString();
    const returnDate = new Date(new Date().setDate(new Date().getDate() + 14)).toISOString();

    this.loanService.addLoan({ bookId, loanDate, returnDate }).subscribe(
      response => {
        console.log('Book loaned successfully:', response);
        this.router.navigate(['/loan']);
      },
      error => {
        console.error('Failed to loan book:', error);
        if (error.status === 400) {
          console.error('Invalid input.');
        } else if (error.status === 500) {
          console.error('Internal server error. Please try again later.');
        } else {
          console.error(`Unexpected error: ${error.status} - ${error.message}`);
        }
      }
    );
  }

  deleteBook(id: number) {
    if (this.book) {
      this.libraryService.deleteBook(id).subscribe({
        next: () => {
          this.bookDeleted.emit(id);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDelete(bookId?: number) {
    if (bookId !== undefined) {
      this.deleteBook(bookId);
      this.modalRef?.hide();
    } else {
      console.error('Book ID is undefined');
    }
  }
  isAdmin(): boolean {
    return this.authService.getUserRole() === 'Admin';
  }
}