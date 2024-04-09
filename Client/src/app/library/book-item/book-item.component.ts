import { Component, Input } from '@angular/core';
import { Book } from '../../shared/models/book';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  @Input() book?: Book;

}
