// book-item.component.ts
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { Book } from '../../shared/models/book';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { LibraryService } from '../library.service';
import { AuthService } from '../../core/services/auth.service';

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
    private authService: AuthService,

  ) { }

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