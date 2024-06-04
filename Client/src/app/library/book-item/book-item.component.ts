// book-item.component.ts
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Book } from '../../shared/models/book';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LibraryService } from '../library.service';
import { LoanService } from '../../loanComponent/loan/loan.service';
import { Router} from '@angular/router';

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
    private loanService: LoanService
  ) {}

  loanBook(bookId: number){
    this.loanService.addLoan(bookId).subscribe(() => {
      console.log('Book added to loan successfully');
    }, (error) => {
    console.error('Failed to add book to loan:', error);  
    });
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