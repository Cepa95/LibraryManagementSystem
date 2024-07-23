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
  maxLoans: number = 6;
  isLoanLimitExceeded: boolean = false;

  constructor(
    private modalService: BsModalService,
    private libraryService: LibraryService,
    protected authService:AuthService,
    private loanService: LoanService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkLoanLimit();
  }

  checkLoanLimit() {
    const userId = this.authService.getUserId();

    if (userId) {
      this.loanService.getUserLoanCounts().subscribe(
        (counts: { [userId: number]: number }) => {
          const currentLoanCount = counts[userId] || 0;
          this.isLoanLimitExceeded = currentLoanCount >= this.maxLoans;
        },
        error => {
          console.error('Failed to fetch user loan counts:', error);
        }
      );
    } else {
      console.error('User is not logged in.');
    }
  }

  loanBook(bookId: number) {
    const userId = this.authService.getUserId();

    if (userId && !this.isLoanLimitExceeded) {
      this.loanService.addLoan({ bookId, userId }).subscribe(
        response => {
          console.log('Book loaned successfully:', response);
          if (this.book) {
            this.book.numberOfCopies--;  // Decrement the number of copies in the frontend
          }
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
}